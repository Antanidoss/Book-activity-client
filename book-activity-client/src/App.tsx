import './App.css';
import React from 'react'
import Navbar from './components/navbar/Navbar'
import BooksContainer from './components/books/BooksContainer'
import { Route, Routes } from 'react-router-dom'

const App: React.FC = () => {
    return (
        <>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/books" element={<BooksContainer />}></Route>
                </Routes>
            </div>
        </>
    );
}

export default App;