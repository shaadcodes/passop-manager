package store

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

func AddPasswordEntry(db *pgxpool.Pool, vaultID, websiteName, websiteURL, username, encryptedPassword, notes string) (string, error) {
	var entryID string
	query := `
	INSERT INTO password_entries (vault_id, website_name, website_url, username, encrypted_password, notes)
	VALUES ($1, $2, $3, $4, $5, $6)
	RETURNING id
	`

	err := db.QueryRow(context.Background(), query, vaultID, websiteName, websiteURL, username, encryptedPassword, notes).Scan(&entryID)
	return entryID, err
}
