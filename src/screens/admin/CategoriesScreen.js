import { useSelector } from "react-redux"

export default function CategoriesScreen(){
    const { segments } = useSelector(state => state.segment);
    
    return(
        <div>{
            segments.map(item => {
                return <div>{item.segment_name}</div>
            })
            }</div>
    )
}