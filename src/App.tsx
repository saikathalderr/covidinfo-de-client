import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Germany from '@/views/Germany';
import GermanyCases from '@/views/GermanyCases';
import GermanyDeaths from '@/views/GermanyDeaths';
import GermanyState from '@/views/GermanyState';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Germany />,
        },
        {
            path: '/germany/cases',
            element: <GermanyCases />,
        },
        {
            path: '/germany/deaths',
            element: <GermanyDeaths />,
        },
        {
            path: '/germany/states/:state',
            element: <GermanyState />,
        },
    ]);

    return (
        <>
            <div className="container mx-auto">
                <RouterProvider router={router} />
            </div>
        </>
    );
}

export default App;
