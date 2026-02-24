export default function Loading({ message = "Cargando..." }) {
    return (
        <section className="flex justify-center items-center relative">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{message}</p>
        </section>
    )
}