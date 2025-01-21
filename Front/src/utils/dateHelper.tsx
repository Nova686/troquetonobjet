const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    // Formatage de la date
    const formattedDate = date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    // Formatage de l'heure
    const formattedTime = date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return `Le ${formattedDate} à ${formattedTime}`;
};

export default formatDate;
