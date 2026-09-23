package utils

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/shaadcodes/passop-backend/models"
)

func GenerateToken(userID, vaultID string) (string, error) {

	jwtSecret := []byte(os.Getenv("JWT_SECRET"))

	claims := models.Claims{
		UserID:  userID,
		VaultID: vaultID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString(jwtSecret)
}
