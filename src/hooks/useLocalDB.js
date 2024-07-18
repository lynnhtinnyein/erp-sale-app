import { v4 as uuid } from 'uuid';
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
            dummyData.forEach( table => {
                localStorage.setItem(table.name, JSON.stringify((table.data)));
            });
        }
    } 
    return new localDB();
}

export default useLocalDB;