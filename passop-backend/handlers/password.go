package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/shaadcodes/passop-backend/middleware"
	"github.com/shaadcodes/passop-backend/models"
	"github.com/shaadcodes/passop-backend/store"
)

func AddPassword(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		vaultID, ok := r.Context().Value(middleware.VaultIDKey).(string)
		if !ok || vaultID == "" {
			http.Error(w, "Unauthorized vault access!", http.StatusUnauthorized)
			return
		}

		var req models.AddPasswordRequest

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body!", http.StatusBadRequest)
			return
		}

		if req.WebsiteName == "" || req.Username == "" || req.EncryptedPassword == "" {
			http.Error(w, "Missing required fields", http.StatusBadRequest)
			return
		}

		entryID, err := store.AddPasswordEntry(db, vaultID, req.WebsiteName, req.WebsiteURL, req.Username, req.EncryptedPassword, req.Notes)
		if err != nil {
			http.Error(w, "Failed to save password!", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]string{
			"message":  "Password added!",
			"entry_id": entryID,
		})
	}
}

func GetPasswords(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vaultID, ok := r.Context().Value(middleware.VaultIDKey).(string)

		if !ok || vaultID == "" {
			http.Error(w, "Unauthorized vault access!!", http.StatusUnauthorized)
			return
		}

		entries, err := store.GetPasswordsByVaultID(db, vaultID)
		if err != nil {
			http.Error(w, "Error fetching your passwords!", http.StatusInternalServerError)
			return
		}

		if entries == nil {
			entries = []models.PasswordEntry{}
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(entries)
	}
}

func UpdatePassword(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		id := chi.URLParam(r, "id")
		if id == "" {
			http.Error(w, "ID is required!", http.StatusBadRequest)
			return
		}

		var req models.AddPasswordRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid JSON!", http.StatusBadRequest)
			return
		}

		err := store.UpdatePasswordEntry(db, id, req.WebsiteName, req.WebsiteURL, req.Username, req.EncryptedPassword, req.Notes)
		if err != nil {
			http.Error(w, "Failed to update!", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"message": "Update successful!"})

	}
}

func DeletePassword(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		id := chi.URLParam(r, "id")
		if id == "" {
			http.Error(w, "ID required!", http.StatusBadRequest)
			return
		}

		err := store.DeletePasswordEntry(db, id)
		if err != nil {
			http.Error(w, "Failed to delete!", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"message": "Deleted Successfully!"})
	}
}
