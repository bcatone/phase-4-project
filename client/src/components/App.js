import "../App.css";

import { useState, useEffect, useContext, createContext } from "react";
import {
  Switch,
  Route,
  BrowserRouter,
  useHistory,
  useParams,
} from "react-router-dom";

import { UserProvider } from "../context/user";

import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";
import NavBar from "./NavBar";
import PostContainer from "./PostContainer";
import CreatePostForm from "./CreatePostForm";
import Home from "./Home";
import UserHomePage from "./UserHomePage";
import UserSettings from "./UserSettings";
import NotFound from "./NotFound";
import EditPostForm from "./EditPostForm";

function App() {
  const [user, setUser] = useState(null);
  const [tags, setTags] = useState([]);
  const history = useHistory();

  // Initial GET requests

  // GET current user
  useEffect(() => {
    fetch("/authorized_user").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          setUser(user);
        })
      } else {
        setUser(null);
      }
    })
  }, []);

  // GET tags and format them for <Editor> tag compatibility (tags aren't used elsewhere)
  useEffect(() => {
    fetch("/tags").then((resp) => {
      if (resp.ok) {
        resp.json().then((tags) => {
          const formattedTags = tags.map(tag => {
            return {id: tag.name, text: tag.name, tag: tag};
          });
          setTags(formattedTags);
        });
      } else {
        setTags([]);
      }
    });
  }, []);

  const updateUser = (user) => setUser(user);

  const updateTags = (addedTag) => {
    
    setTags([...tags, {id: addedTag.name, text: addedTag.name, tag: addedTag}])};

  return (
    <div className="App">
      <Header user={user} updateUser={updateUser} />
      <div>
        <Switch>
          <Route path="/users/:id/settings">
            <UserSettings user={user} updateUser={updateUser} />
          </Route>
          <Route path="/user/:id/posts/new">
            <CreatePostForm user={user} tags={tags} updateTags={updateTags}/>
          </Route>
          <Route path="user/:id/posts/edit">
            <EditPostForm user={user} tags={tags} updateTags={updateTags}/>
          </Route>
          <Route path="/users/:id">
            <UserHomePage user={user} updateUser={updateUser} />
          </Route>
          <Route path="/posts">
            <PostContainer user={user} tags={tags}/>
          </Route>
          <Route path="/login" >
            <Login user={user} updateUser={updateUser} />
          </Route>
          <Route path="/signup">
            <Signup updateUser={updateUser} />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
