import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import axios from 'axios';

const AccountPage: React.FC = () => {

    // Function to handle profile edit button click
    const handleEditProfile = () => {
        alert("Modifier le profil cliqué !");
        // You can navigate to the edit profile page or open a modal
    };

    // Function to handle view more button click
    const handleViewMore = () => {
        alert("Voir plus d'annonces !");
        // Logic to load more ads or redirect
    };

    return (
        <>
            <header>
                <h1>Mon Profil</h1>
            </header>

            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-avatar">
                    <img src={require('./Avatar.jpg')} alt="Avatar de l'utilisateur" />
                    </div>
                    <div className="profile-info">
                        <h2>Nom d'utilisateur</h2>
                        <p><strong>Email :</strong> utilisateur@email.com</p>
                        <p><strong>Localisation :</strong> Lyon, France</p>
                        <p><strong>Nombre d'annonces :</strong> 12</p>
                        <button className="edit-btn" onClick={handleEditProfile}>
                            Modifier le profil
                        </button>
                    </div>
                </div>

                <div className="history-container">
                    <h3>Mes Annonces</h3>
                    <div className="ad-card">
                        <img src="./gourde.jpeg" alt="Annonce 1" />  
                        <div className="ad-info">
                            <h4>Titre de l'objet</h4>
                            <p>Description courte de l'annonce...</p>
                            <span>Date : 12/06/2024</span>
                        </div>
                    </div>
                    <div className="ad-card">
                        <img src="./gourde.jpeg" alt="Annonce 2" />
                        <div className="ad-info">
                            <h4>Deuxième objet</h4>
                            <p>Description courte de l'annonce...</p>
                            <span>Date : 10/06/2024</span>
                        </div>
                    </div>
                    <button className="view-more" onClick={handleViewMore}>
                        Voir plus
                    </button>
                </div>
            </div>
        </>
    );
};

export default AccountPage;
