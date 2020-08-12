package main

import (
	"flag"
	"fmt"
	"net/http"

	"os"

	//"types"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

var (
	address     = flag.String("address", getAddress(), "Server Listening Address")
	projectPath = flag.String("projectRootPath", getProjectPath(), "ProjectRootPath")
)

func getAddress() string {
	env := os.Getenv("BACKEND_ADDRESS")
	if env != "" {
		return env
	} else {
		return "127.0.0.1:5000"
	}
}

func getProjectPath() string {
	env := os.Getenv("PROJECT_ROOT_PATH")
	if env != "" {
		return env
	} else {
		return "/home/guest"
	}
}

func RunMonitor() echo.HandlerFunc {
	return func(c echo.Context) error {
		userId := c.Param("userId")
		fmt.Printf("Get RunMonitor Request: %v %v\n", userId)
		return c.JSON(http.StatusOK, "")
	}
}

func serveEcho() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	e.POST("/monitor/run/:userId", RunMonitor())

	e.Logger.Fatal(e.Start(*address))

}

func main() {
	fmt.Printf("Starting...")
	serveEcho()

}
