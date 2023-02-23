import './App.css';
import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.js';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {

  state = {
    progress:0
  }

  setProgress = (progress) => {
      this.setState({progress: progress})
  }

  render() {
    return (
      <div>
         <BrowserRouter>
         <Navbar />
         <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
            <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} pageSize={20} country='in' newsCatogory='top' />} /> 
              <Route exact path="business"  element={<News setProgress={this.setProgress} key="business" pageSize={10} country='in' newsCatogory='business' />} /> 
              <Route exact path="entertainment"  element={<News setProgress={this.setProgress} key="entertainment" pageSize={10} country='in' newsCatogory='entertainment' />} /> 
              <Route exact path="top"  element={<News setProgress={this.setProgress} key="news" pageSize={10} country='in' newsCatogory='top' />} /> 
              <Route exact path="health"   element={<News setProgress={this.setProgress} key="health" pageSize={10} country='in' newsCatogory='health' />} /> 
              <Route exact path="science"  element={<News setProgress={this.setProgress} key="science" pageSize={10} country='in' newsCatogory='science' />} /> 
              <Route exact path="sports"  element={<News setProgress={this.setProgress} key="sports" pageSize={10} country='in' newsCatogory='sports' />} /> 
              <Route exact path="technology"  element={<News setProgress={this.setProgress} key="technology" pageSize={10} country='in' newsCatogory='technology' />} /> 
            </Routes>
        </BrowserRouter>        
      </div>
    )
  }
}