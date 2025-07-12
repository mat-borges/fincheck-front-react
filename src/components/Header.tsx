import Logo from '../assets/FinCheck-logo.png';

export default function Header() {
    return (
        <header className="bg-primary text-secondary px-6 py-4 shadow-md flex justify-between items-center">
            <div className="flex items-center gap-4">
                <img src={Logo} alt="Logo" className="w-12" />
                <h1 className="text-2xl font-bold tracking-tight">FinCheck</h1>
            </div>
            <div className="text-sm font-medium">Olá, Mateus 👋</div>
        </header>
    );
}
