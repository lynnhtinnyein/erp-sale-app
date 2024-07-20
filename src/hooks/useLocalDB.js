import seeders from "../seeders";

const useLocalDB = () => {
    class localDB {
        get(url) {
            const parts = url.split('/');
            const table = parts[0];
            const id = parts[1];
            
            const data = JSON.parse(localStorage.getItem(table)) || [];
            return id ? data.filter( e => e.id.toString() === id) : data
        }
        
        post(table, newData){
            const storedData = JSON.parse(localStorage.getItem(table)) || [];
            storedData.push(newData);
            localStorage.setItem(table, JSON.stringify(storedData));
        }

        put(url, newData){
            const parts = url.split('/');
            const table = parts[0];
            const id = parts[1];

            const storedData = JSON.parse(localStorage.getItem(table)) || [];
            const targetItem = storedData.find( e => e.id.toString() === id);
            const updatedItem = {...targetItem, ...newData};
            const replacedData = storedData.map( e => e.id.toString() === id ? updatedItem : e );
            localStorage.setItem(table, JSON.stringify(replacedData));
        }

        delete(url){
            const parts = url.split('/');
            const table = parts[0];
            const id = parts[1];

            const storedData = JSON.parse(localStorage.getItem(table)) || [];
            const filteredData = storedData.filter( e => e.id.toString() !== id );
            localStorage.setItem(table, JSON.stringify(filteredData));
        }

        seed(){
            seeders.forEach( seeder => {
                localStorage.setItem(seeder.tableName, JSON.stringify((seeder.data)));
            });
        }
    } 
    return new localDB();
}

export default useLocalDB;