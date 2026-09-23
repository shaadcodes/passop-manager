package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/shaadcodes/passop-backend/models"
	"github.com/shaadcodes/passop-backend/store"
	"github.com/shaadcodes/passop-backend/utils"
	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.RegisterRequest

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body!", http.StatusBadRequest)
			return
		}

		hash, err := utils.HashPassword(req.Password)
		if err != nil {
			http.Error(w, "An error occured!", http.StatusInternalServerError)
			return
		}

		newID, vaultID, err := store.CreateUser(db, req.Email, hash)
		if err != nil {
			log.Printf("ERROR during user creation: %v", err) // Logs full PostgreSQL error to Render
			http.Error(w, "Email already exists or error registering user!", http.StatusConflict)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]string{
			"message":  "User created successfully!",
			"user_id":  newID,
			"vault_id": vaultID,
		})
	}
}

func LoginUser(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		var req models.LoginRequest

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid body request!", http.StatusBadRequest)
			return
		}

		user, err := store.GetUserByEmail(db, req.Email)
		if err != nil {
			http.Error(w, "Invalid Email or Password!", http.StatusUnauthorized)
			return
		}

		err = bcrypt.CompareHashAndPassword([]byte(user.MasterPasswordHash), []byte(req.Password))
		if err != nil {
			http.Error(w, "Invalid Email or Password!", http.StatusUnauthorized)
			return
		}

		token, err := utils.GenerateToken(user.ID, user.VaultID)
		if err != nil {
			http.Error(w, "Failed to generate token!", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"token":    token,
			"vault_id": user.VaultID,
		})
	}
}
