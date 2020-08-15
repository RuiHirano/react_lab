package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"os"

	//"types"
	pb "proto"

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

var data = &pb.Data{UserMap: make(map[string]*pb.User)}

func PostComponent() echo.HandlerFunc {
	return func(c echo.Context) error {
		userId := c.Param("userId")
		appId := c.Param("appId")
		pageId := c.Param("pageId")
		cmpId := c.Param("cmpId")
		log.Printf("got post component")
		log.Printf("uid %v, appId %d, pageId %d, cmpId %d", userId, appId, pageId, cmpId)
		cmp := new(pb.Component)
		if err := c.Bind(cmp); err != nil {
			return err
		}
		if err := data.SetComponent(userId, appId, pageId, cmp); err != nil {
			return err
		}
		log.Printf("cmp %v\n", cmp)
		log.Printf("data %v\n", data)
		//data.UserMap[userId].AppMap[appId].PageMap[pageId].ComponentMap[cmpId] = cmp
		//fmt.Printf("Get PostComponents Request: %v %v\n", userId)
		return c.JSON(http.StatusOK, "ok")
	}
}

func GetComponent() echo.HandlerFunc {
	return func(c echo.Context) error {
		userId := c.Param("userId")
		appId := c.Param("appId")
		pageId := c.Param("pageId")
		cmpId := c.Param("cmpId")
		log.Printf("got get component")
		log.Printf("uid %v, appId %d, pageId %d, cmpId %d", userId, appId, pageId, cmpId)
		//user := data.GetUserMap()[userId]
		if cmp, err := data.GetComponent(userId, appId, pageId, cmpId); err != nil {
			return err
		} else {
			return c.JSON(http.StatusOK, cmp)
		}
	}
}

func PostPage() echo.HandlerFunc {
	return func(c echo.Context) error {
		userId := c.Param("userId")
		appId := c.Param("appId")
		pageId := c.Param("pageId")
		log.Printf("got post page")
		log.Printf("uid %v, appId %d, pageId %d", userId, appId, pageId)
		page := new(pb.Page)
		if err := c.Bind(page); err != nil {
			return err
		}
		if err := data.SetPage(userId, appId, page); err != nil {
			return err
		}
		log.Printf("page %v\n", page)
		log.Printf("data %v\n", data)
		//data.UserMap[userId].AppMap[appId].PageMap[pageId].PageMap[cmpId] = cmp
		//fmt.Printf("Get PostPages Request: %v %v\n", userId)
		return c.JSON(http.StatusOK, "ok")
	}
}

func GetPage() echo.HandlerFunc {
	return func(c echo.Context) error {
		userId := c.Param("userId")
		appId := c.Param("appId")
		pageId := c.Param("pageId")
		log.Printf("got get page")
		log.Printf("uid %v, appId %d, pageId %d", userId, appId, pageId)
		//user := data.GetUserMap()[userId]
		if cmp, err := data.GetPage(userId, appId, pageId); err != nil {
			return err
		} else {
			return c.JSON(http.StatusOK, cmp)
		}
	}
}

func PostApp() echo.HandlerFunc {
	return func(c echo.Context) error {
		userId := c.Param("userId")
		appId := c.Param("appId")
		log.Printf("got post app")
		log.Printf("uid %v, appId %d", userId, appId)
		app := new(pb.App)
		if err := c.Bind(app); err != nil {
			return err
		}
		if err := data.SetApp(userId, app); err != nil {
			return err
		}
		log.Printf("app %v\n", app)
		log.Printf("data %v\n", data)
		//data.UserMap[userId].AppMap[appId].AppMap[app].AppMap[cmpId] = cmp
		//fmt.Printf("Get PostApps Request: %v %v\n", userId)
		return c.JSON(http.StatusOK, "ok")
	}
}

func GetApp() echo.HandlerFunc {
	return func(c echo.Context) error {
		userId := c.Param("userId")
		appId := c.Param("appId")
		log.Printf("got get app")
		log.Printf("uid %v, appId %d", userId, appId)
		//user := data.GetUserMap()[userId]
		if cmp, err := data.GetApp(userId, appId); err != nil {
			return err
		} else {
			return c.JSON(http.StatusOK, cmp)
		}
	}
}

func PostUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		userId := c.Param("userId")
		log.Printf("got post user")
		log.Printf("uid %v", userId)
		user := new(pb.User)
		if err := c.Bind(user); err != nil {
			return err
		}
		if err := data.SetUser(user); err != nil {
			return err
		}
		log.Printf("user %v\n", user)
		log.Printf("data %v\n", data)
		//data.UserMap[userId].UserMap[appId].UserMap[app].UserMap[cmpId] = cmp
		//fmt.Printf("Get PostUsers Request: %v %v\n", userId)
		return c.JSON(http.StatusOK, "ok")
	}
}

func GetUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		userId := c.Param("userId")
		log.Printf("got get user")
		log.Printf("uid %v", userId)
		log.Printf("data %v", data.GetUserMap())
		//user := data.GetUserMap()[userId]
		if cmp, err := data.GetUser(userId); err != nil {
			return err
		} else {
			return c.JSON(http.StatusOK, cmp)
		}
	}
}

func serveEcho() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	e.POST("/api/v1/component/:userId/:appId/:pageId/:cmpId", PostComponent()) // componentsの送信
	e.GET("/api/v1/component/:userId/:appId/:pageId/:cmpId", GetComponent())   // componentsの取得
	e.POST("/api/v1/page/:userId/:appId/:pageId", PostPage())                  // pageの送信
	e.GET("/api/v1/page/:userId/:appId/:pageId", GetPage())                    // pageの取得
	e.POST("/api/v1/app/:userId/:appId", PostApp())                            // appの送信
	e.GET("/api/v1/app/:userId/:appId", GetApp())                              // appの取得
	e.POST("/api/v1/user/:userId", PostUser())                                 // userの送信
	e.GET("/api/v1/user/:userId", GetUser())                                   // userの取得

	e.Logger.Fatal(e.Start(*address))

}

func main() {
	fmt.Printf("Starting...")
	serveEcho()

}
