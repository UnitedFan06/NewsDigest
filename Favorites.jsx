import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists() && docSnap.data().favorites) {
            setFavorites(docSnap.data().favorites);
          } else {
            setFavorites([]);
          }
        } catch (error) {
          console.error("Error loading favorites:", error);
        }
      }
    };
    fetchFavorites();
  }, [user]);
  const handleRemoveFavorite = async (url) => {
    const updatedFavorites = favorites.filter((article) => article.url !== url);
    setFavorites(updatedFavorites);
    if (user) {
      try {
        await setDoc(
          doc(db, "users", user.uid),
          { favorites: updatedFavorites },
          { merge: true }
        );
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    }
  };
  return (
    <div>
      <Navbar />
      <h1>Your Favorite Articles</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((article, index) => (
            <li key={index} className="article-card1">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read More
              </a><br></br>
              <button className="article-button" onClick={() => handleRemoveFavorite(article.url)}>
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite articles yet!</p>
      )}
    </div>
  );
}

export default Favorites;
