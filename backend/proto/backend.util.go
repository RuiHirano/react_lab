package api

import "fmt"

func NewData() *Data {
	d := &Data{
		UserMap: make(map[string]*User),
	}
	return d
}

func (m *Data) GetUser(uid string) (*User, error) {
	if user, ok := m.GetUserMap()[uid]; ok {
		return user, nil
	}
	return nil, fmt.Errorf("not found user")
}

func (m *Data) GetApp(uid string, appId string) (*App, error) {
	if user, err := m.GetUser(uid); err != nil {
		return nil, err
	} else if app, err := user.GetApp(appId); err != nil {
		return nil, err
	} else {
		return app, nil
	}
}

func (m *Data) GetPage(uid string, appId string, pageId string) (*Page, error) {
	if app, err := m.GetApp(uid, appId); err != nil {
		return nil, err
	} else if page, err := app.GetPage(pageId); err != nil {
		return nil, err
	} else {
		return page, nil
	}
}

func (m *Data) GetComponent(uid string, appId string, pageId string, cmpId string) (*Component, error) {
	if page, err := m.GetPage(uid, appId, pageId); err != nil {
		return nil, err
	} else if cmp, err := page.GetComponent(cmpId); err != nil {
		return nil, err
	} else {
		return cmp, nil
	}
}
func (m *Data) SetUser(user *User) error {
	m.UserMap[user.Id] = user
	return nil
}

func (m *Data) SetApp(uid string, app *App) error {
	if user, err := m.GetUser(uid); err != nil {
		return err
	} else {
		user.AppMap[app.Id] = app
		return m.SetUser(user) // return error or nil
	}
}

func (m *Data) SetPage(uid string, appId string, page *Page) error {
	if app, err := m.GetApp(uid, appId); err != nil {
		return err
	} else {
		app.PageMap[page.Id] = page
		return m.SetApp(uid, app) // return error or nil
	}
}

func (m *Data) SetComponent(uid string, appId string, pageId string, cmp *Component) error {
	if page, err := m.GetPage(uid, appId, pageId); err != nil {
		return err
	} else {
		page.ComponentMap[cmp.Id] = cmp
		return m.SetPage(uid, appId, page) // return error or nil
	}
}

func NewUser() *User {
	d := &User{
		Id:     "",
		AppMap: make(map[string]*App),
	}
	return d
}

func (m *User) GetApp(appid string) (*App, error) {
	if app, ok := m.GetAppMap()[appid]; ok {
		return app, nil
	}
	return nil, fmt.Errorf("not found app")
}

func NewApp() *App {
	d := &App{
		Id:          "",
		Title:       "Untitled",
		Description: "No discription",
		PageMap:     make(map[string]*Page),
	}
	return d
}

func (m *App) GetPage(pageid string) (*Page, error) {
	if page, ok := m.GetPageMap()[pageid]; ok {
		return page, nil
	}
	return nil, fmt.Errorf("not found page")
}

func NewPage() *Page {
	d := &Page{
		Id:           "",
		Num:          0,
		ComponentMap: make(map[string]*Component),
	}
	return d
}

func (m *Page) GetComponent(cmpid string) (*Component, error) {
	if cmp, ok := m.GetComponentMap()[cmpid]; ok {
		return cmp, nil
	}
	return nil, fmt.Errorf("not found component")
}
