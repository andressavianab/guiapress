export const ArticleCard = (props) => {
    return(
        <div class="max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700" key={props.key}>
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white font-inclusive">{props.title}</h5>
            </a>
            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 ">
                Read 
                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
        </div>
    )
}