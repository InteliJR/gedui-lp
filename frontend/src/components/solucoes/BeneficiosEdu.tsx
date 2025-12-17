import Image from "next/image"
import TrilhaBeneficiosEdu from "./TrilhaBeneficiosEdu"

export default function SecaoBeneficiosEdu() {
    return (
        <section className="bg-primary p-8 flex flex-col items-center space-y-8">
            <h2 className="p-8 bg-white/1 border border-white/10 backdrop-blur-md text-[#EBF0F2] text-center font-inter text-4xl font-bold rounded-lg max-w-4xl shadow-lg">Benefícios com Gedui Edu</h2>
            <p className="md:w-7xl text-lg">
                Explore os benefícios que podem transformar a sua instituição educacional, proporcionando uma experiência de troca de aprendizado inovadora para alunos, professores e gestores. Conheça alguns destes benefícios. Para maiores detalhes, agende uma demonstração com os nossos especialistas.
            </p>

            <div className="w-full flex flex-col lg:flex-row justify-between space-y-6">
                <div className="lg:w-1/2 flex items-center justify-center">
                    <Image
                        src={"/logo_parcial.png"}
                        alt="Logo da Gedui"
                        width={350}
                        height={140}
                    />
                </div>
                <div className="lg:w-1/2 flex justify-center">
                    <div className="backdrop-blur-md bg-white/1 p-8 border border-white/10 rounded-lg shadow-lg max-w-md">
                        <ul className="list-disc list-outside pl-6 space-y-2 text-white text-base md:text-lg">
                            <li>Treinamentos e certificações</li>
                            <li>Potencialize os resultados de sua Instituição</li>
                            <li>Segurança e confiabilidade</li>
                            <li>Acompanhamento individual</li>
                            <li>Gestão de usuários e grupos</li>
                            <li>Educação participativa</li>
                            <li>
                                Potencializa e direciona as experiências e resultados
                            </li>
                            <li>
                                Assistência na aprendizagem de seus alunos
                            </li>
                            <li>
                                Redução na defasagem no aprendizado
                            </li>
                            <li>
                                Análise da curva de aprendizagem
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            <TrilhaBeneficiosEdu />
        </section>
    )
}
