package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/shaadcodes/passop-backend/models"
)

func HandleContactSubmit(w http.ResponseWriter, r *http.Request) {
	log.Println("[API REACHED] /api/connect endpoint triggered!")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	var req models.ContactSubmit
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Printf("[ERROR] JSON Decode failed: %v", err)
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Feedback received!"})

	go func(data models.ContactSubmit) {
		apiKey := os.Getenv("RESEND_API_KEY")
		recipient := os.Getenv("SMTP_EMAIL")

		if apiKey == "" {
			log.Println("[CRITICAL ERROR] RESEND_API_KEY environment variable is missing in Render!")
			return
		}

		htmlContent := fmt.Sprintf(`
			<h3>New Feedback Received from PassOP</h3>
			<p><strong>Name:</strong> %s</p>
			<p><strong>Email:</strong> %s</p>
			<p><strong>Subject:</strong> %s</p>
			<hr />
			<p><strong>Message:</strong></p>
			<p>%s</p>
		`, data.Name, data.Email, data.Subject, data.Message)

		payload := models.ResendEmailPayload{
			From:    "PassOP Feedback <onboarding@resend.dev>", // Resend default testing address
			To:      []string{recipient},
			Subject: fmt.Sprintf("PassOP Feedback: %s", data.Subject),
			Html:    htmlContent,
		}

		jsonPayload, err := json.Marshal(payload)
		if err != nil {
			log.Printf("[ERROR] Resend payload marshal failed: %v", err)
			return
		}

		httpReq, err := http.NewRequest("POST", "https://api.resend.com/emails", bytes.NewBuffer(jsonPayload))
		if err != nil {
			log.Printf("[ERROR] Creating Resend HTTP request failed: %v", err)
			return
		}

		httpReq.Header.Set("Authorization", "Bearer "+apiKey)
		httpReq.Header.Set("Content-Type", "application/json")

		client := &http.Client{}
		resp, err := client.Do(httpReq)
		if err != nil {
			log.Printf("[ERROR] Resend API call failed: %v", err)
			return
		}
		defer resp.Body.Close()

		if resp.StatusCode == http.StatusOK || resp.StatusCode == http.StatusCreated {
			log.Println("[RESEND SUCCESS] Feedback email delivered directly to inbox via HTTPS!")
		} else {
			log.Printf("[RESEND ERROR] Received status code %d from Resend API", resp.StatusCode)
		}
	}(req)
}
