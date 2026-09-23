package models

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type User struct {
	ID                 string `json:"id"`
	Email              string `json:"email"`
	MasterPasswordHash string `json:"-"`
}

type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AddPasswordRequest struct {
	VaultID           string `json:"vault_id"`
	WebsiteName       string `json:"website_name"`
	WebsiteURL        string `json:"website_url"`
	Username          string `json:"username"`
	EncryptedPassword string `json:"encrypted_password"`
	Notes             string `json:"notes"`
}

type PasswordEntry struct {
	ID                string `json:"id"`
	VaultID           string `json:"vault_id"`
	WebsiteName       string `json:"website_name"`
	WebsiteURL        string `json:"website_url"`
	Username          string `json:"username"`
	EncryptedPassword string `json:"encrypted_password"`
	Notes             string `json:"notes"`
	CreatedAt         time.Time
	UpdatedAt         time.Time
}

type Claims struct {
	UserID  string `json:"user_id"`
	VaultID string `json:"vault_id"`
	jwt.RegisteredClaims
}

type UserAuthData struct {
	ID                 string
	Email              string
	MasterPasswordHash string
	VaultID            string
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
