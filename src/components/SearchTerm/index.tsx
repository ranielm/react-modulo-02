import { useTask } from "../../context/task.contex";
import { Input } from "../../screens/Listview/Listview.styles"


const SearchTerm = () => {

    const { searchTerm, setSearchTerm } = useTask();


    return (
        <>
        <Input
            placeholder="Search tasks"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
        />
        </>
    )


}

export { SearchTerm }