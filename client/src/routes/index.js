import UIChatbot from "../pages/Chatbot"
import ImageObjectDetection from "../pages/ImageObjectDetection"
import HomePage from '../pages/HomePage';

// Layouts
import { HeaderOnly } from '../components/Layout'


const publicRoutes = [
    { path: '/', component: HomePage},
    { path: '/object_detection', component: ImageObjectDetection},
    { path: '/rasabot', component: UIChatbot, layout: HeaderOnly}
]

const privateRoutes = [
// with log-in

]

export { publicRoutes, privateRoutes }