import dummyData from "../dummy-data";

const useLocalDB = () => {
    class localDB {
        get(url) {
            const parts = url.split('/');
            const table = parts[0];
            const id = parts[1];
            
            const data = JSON.parse(localStorage.getItem(table)) || []
            return id ? data.find( e => e.id.toString() === id) : data
        }
        
        post(table, data){
            const storedData = JSON.parse(localStorage.getItem(table)) || [];
            storedData.push(data);
            localStorage.setItem(table, JSON.stringify(storedData));
        }

        put(){

        }

        delete(url){
            const parts = url.split('/');
            const table = parts[0];
            const id = parts[1];

            const storedData = JSON.parse(localStorage.getItem(table)) || [];
            const filteredData = storedData.filter( e => e.id.toString() != id );
            localStorage.setItem(table, JSON.stringify(filteredData));
        }

        seed(){
            dummyData.forEach( table => {
                localStorage.setItem(table.name, JSON.stringify((table.data)));
            });
        }
    } 
    return new localDB();
}

export default useLocalDB;