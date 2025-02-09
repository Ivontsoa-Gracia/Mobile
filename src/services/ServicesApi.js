import { Alert } from 'react-native';

export const fetchCoffeeData = async () => {
    try {
        const response = await fetch('http://172.90.28.67/my-app/reactWebService/getProduit.php');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching coffee data:', error);
        Alert.alert('Error', 'Failed to load coffee data.'); 
    }
};

