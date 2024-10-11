import select from 'react-select'
import Card from '../components/Card'
function TasksPage() {
    return (
        <div>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10"><g clip-path="url(#play_filled_white)"><path d="M20 0C8.956 0 0 8.956 0 20s8.956 20 20 20 20-8.956 20-20S31.044 0 20 0zm9.272 20.961l-3.247 1.875-3.247 1.875-6.495 3.75a1.11 1.11 0 01-1.666-.961v-15a1.11 1.11 0 011.666-.961l3.248 1.875 3.247 1.875 6.494 3.75a1.11 1.11 0 010 1.922z" fill="currentColor"></path><path d="M16.283 28.461l6.495-3.75 3.247-1.875 3.247-1.875a1.11 1.11 0 000-1.922l-6.494-3.75-3.247-1.875-3.248-1.875a1.11 1.11 0 00-1.666.961v15a1.11 1.11 0 001.666.961z" fill="#fff"></path></g><defs><clipPath id="play_filled_white"><path fill="#fff" d="M0 0h40v40H0z"></path></clipPath></defs></svg>
        <Card></Card>
        </div>
        
    )
}

export default TasksPage