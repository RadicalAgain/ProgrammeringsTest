/*
File for hosting requests to an API   
(i detta fall är det endast mot en url i browser och inte server därav har jag ingen server (backend) fil/directory)
*/


/*
    * Fetching all userdata from an API, throws and error upon faulty request
*/
export async function fetchAllUserData() {

    try {
        const response = await fetch('https://reqres.in/api/users');
        if (!response.ok) {
            throw new Error('wrong fetching userData');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error(error);
    }

}



/*
    * Fetching specific userdata from an API with id = ${id}, throws and error upon faulty request
*/
export async function fetchUserData(id) {

    try {
        const response = await fetch(`https://reqres.in/api/users/${id}`);
        if (!response.ok) {
            throw new Error('wrong fetching userData');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }

}