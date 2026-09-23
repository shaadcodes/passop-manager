package store

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/shaadcodes/passop-backend/models"
)

func CreateUser(db *pgxpool.Pool, email string, hash string) (string, string, error) {
	ctx := context.Background()

	tx, err := db.Begin(ctx)
	if err != nil {
		return "", "", err
	}
	defer tx.Rollback(ctx)

	var userID string

	userQuery := `INSERT INTO users (email, master_password_hash) VALUES ($1, $2) RETURNING id::text`
	err = tx.QueryRow(ctx, userQuery, email, hash).Scan(&userID)
	if err != nil {
		return "", "", err
	}

	var vaultID string
	vaultQuery := `INSERT INTO vaults (user_id, name) VALUES ($1::uuid, $2) RETURNING id::text`
	err = tx.QueryRow(ctx, vaultQuery, userID, "Personal Vault").Scan(&vaultID)
	if err != nil {
		return "", "", err
	}

	err = tx.Commit(ctx)
	if err != nil {
		return "", "", err
	}

	return userID, vaultID, nil
}

func GetPasswordsByVaultID(db *pgxpool.Pool, vaultID string) ([]models.PasswordEntry, error) {

	query := `
		SELECT id, vault_id, website_name, website_url, username, encrypted_password, notes, created_at, updated_at
		FROM password_entries
		WHERE vault_id = $1
	`

	rows, err := db.Query(context.Background(), query, vaultID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var entries []models.PasswordEntry

	for rows.Next() {
		var entry models.PasswordEntry
		err := rows.Scan(
			&entry.ID, &entry.VaultID, &entry.WebsiteName, &entry.WebsiteURL, &entry.Username, &entry.EncryptedPassword, &entry.Notes, &entry.CreatedAt, &entry.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		entries = append(entries, entry)
	}

	return entries, rows.Err()
}

func UpdatePasswordEntry(db *pgxpool.Pool, id, websiteName, websiteURL, username, encryptedPassword, notes string) error {

	query := `
		UPDATE password_entries
		SET website_name = $1, website_url = $2, username = $3, encrypted_password = $4, notes = $5, updated_at = CURRENT_TIMESTAMP
		WHERE id = $6
	`
	_, err := db.Exec(context.Background(), query, websiteName, websiteURL, username, encryptedPassword, notes, id)

	return err
}

func DeletePasswordEntry(db *pgxpool.Pool, id string) error {
	query := `DELETE FROM password_entries WHERE id = $1`

	_, err := db.Exec(context.Background(), query, id)
	return err
}

func GetUserByEmail(db *pgxpool.Pool, email string) (*models.UserAuthData, error) {

	var data models.UserAuthData

	query := `
		SELECT u.id, u.email, u.master_password_hash, v.id
		FROM users u
		JOIN vaults v ON u.id = v.user_id
		WHERE u.email = $1
		LIMIT 1
	`

	err := db.QueryRow(context.Background(), query, email).Scan(&data.ID, &data.Email, &data.MasterPasswordHash, &data.VaultID)
	if err != nil {
		return nil, err
	}

	return &data, nil
}
