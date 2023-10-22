import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Germany from '@/views/Germany';
import GermanyCases from '@/views/GermanyCases';
import GermanyDeaths from '@/views/GermanyDeaths';

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
