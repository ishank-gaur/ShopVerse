package main

import (
	"ecommerce/handlers"
	"ecommerce/middleware"
	"ecommerce/models"
	"github.com/joho/godotenv"
	"github.com/gin-gonic/gin"
	"log"
	"github.com/gin-contrib/cors"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	r := gin.Default()
	// After r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))


	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Welcome to the E-commerce API!",
		})
	})

	db := models.SetupDatabase()
	if db != nil {
		log.Println("DB connected successfully")
	}

	r.POST("/users", handlers.SignUp)
	r.POST("/users/login", handlers.Login)
	r.POST("/users/refresh", handlers.RefreshToken)

	auth := r.Group("/")
	auth.Use(middleware.AuthMiddleware())
{
		auth.POST("/carts", handlers.AddToCart)
		auth.POST("/orders", handlers.PlaceOrder)
		auth.GET("/carts", handlers.ListCart)
		auth.GET("/orders", handlers.ListOrders)
}

	r.GET("/items", handlers.ListItems)
	r.GET("/users", handlers.ListUsers)

	if err := r.Run(":8080"); err != nil {
		log.Fatal("Server error:", err)
	}
}
