package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/shaadcodes/passop-backend/handlers"
	"github.com/shaadcodes/passop-backend/middleware"
)

func main() {

	if err := godotenv.Load(); err != nil {
		log.Println("Error laoding environment variables!")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatal("DATABASE_URL Environment variable missing!")
	}

	pool, err := pgxpool.New(context.Background(), dbURL)
	if err != nil {
		log.Fatalf("Unable to create connection pool! : %v\n", err)
	}
	defer pool.Close()

	fmt.Println("Connected to 'passop' PostgreSQL Database!")

	router := chi.NewRouter()

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "https://passop-manager.vercel.app"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	router.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("PassOP API running..."))
	})
	router.Post("/api/users/register", handlers.RegisterUser(pool))
	router.Post("/api/users/login", handlers.LoginUser(pool))
	router.Post("/api/connect", handlers.HandleContactSubmit)

	router.Group(func(r chi.Router) {
		r.Use(middleware.AuthMiddleWare)
		r.Get("/api/passwords", handlers.GetPasswords(pool))
		r.Post("/api/passwords", handlers.AddPassword(pool))
		r.Put("/api/passwords/{id}", handlers.UpdatePassword(pool))
		r.Delete("/api/passwords/{id}", handlers.DeletePassword(pool))
	})

	address := fmt.Sprintf("0.0.0.0:%s", port)
	fmt.Printf("Sever is listening on %s", address)

	server := &http.Server{
		Addr:         address,
		Handler:      router,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	err = server.ListenAndServe()
	if err != nil {
		log.Fatalf("Server failed to start! : %v\n", err)
	}

}
