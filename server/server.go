package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {

	staticDir := "../front"

	http.Handle("/", http.FileServer(http.Dir(staticDir)))

	http.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Server is working!")
	})

	server := &http.Server{
		Addr:         ":8080",
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	fmt.Println("Server starting at http://localhost:8080")
	fmt.Println("Serving files from:", staticDir)

	err := server.ListenAndServe()
	if err != nil {
		fmt.Println("Server failed:", err)
	}
}
