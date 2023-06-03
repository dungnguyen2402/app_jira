import pageViews from "../db.json"
import { useSearchParams } from 'react-router-dom'


const FormModal = () => {
    const [searchParams] = useSearchParams()

    const currentPage = pageViews.find((page) => page.id === searchParams.get('sid'))
    console.log(currentPage);

    return (
        <div>FormModal</div>
    )
}

export default FormModal