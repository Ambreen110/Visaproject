export default function HomePage() {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Welcome to the Visa Management System</h2>
            <nav>
                <a href="/retrieve" className="text-blue-500 hover:underline mr-4">Retrieve Visa</a>
                <a href="/upload" className="text-blue-500 hover:underline mr-4">Upload Visa</a>
                <a href="/admin" className="text-blue-500 hover:underline">Admin Panel</a>
            </nav>
        </div>
    );
}
