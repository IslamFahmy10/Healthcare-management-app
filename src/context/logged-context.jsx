import { createContext,useState,useEffect} from "react";
export const LoggedContext = createContext({
    logged: false,
    setLogged: () => {},
    userId: null,
    setUserId: () => {},
    role: null,
    setRole: () => {},
    username: null,
    setUsername: () => {},
    name: null,
    setName: () => {},
    age: null,
    setAge: () => {},
});
export const LoggedProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('logged') === 'true' //return boolean here if logged or not;
    const user = JSON.parse(localStorage.getItem('user'));

    if (loggedIn && user) {
      setLogged(true);
      setUserId(user.id);
      setRole(user.role);
      setName(user.name);
      setUsername(user.username);
      setAge(user.age); 
    }
  }, []);
  const values = { logged , setLogged , userId, setUserId, role, setRole, username, setUsername ,name ,setName ,age, setAge};
  return (
    <LoggedContext.Provider value={values}>{children}</LoggedContext.Provider>
  );
};