"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface Tarefa {
  id: number
  texto: string
  concluida: boolean
}

export default function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [novaTargefa, setNovaTargefa] = useState("")
  const salvarTarefas = (listaTarefas: Tarefa[]) => {
    localStorage.setItem("tarefas", JSON.stringify(listaTarefas))
  }

  const carregarTarefas = (): Tarefa[] => {
    const tarefasSalvas = localStorage.getItem("tarefas")
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : []
  }

  useEffect(() => {
    const tarefasCarregadas = carregarTarefas()
    setTarefas(tarefasCarregadas)
  }, [])

  useEffect(() => {
    salvarTarefas(tarefas)
  }, [tarefas])

  const adicionarTarefa = () => {
    if (novaTargefa.trim() !== "") {
      const novaTarefa: Tarefa = {
        id: Date.now(),
        texto: novaTargefa,
        concluida: false,
      }
      setTarefas([...tarefas, novaTarefa])
      setNovaTargefa("")
    }
  }

  const removerTarefa = (id: number) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id))
  }

  const alternarConclusao = (id: number) => {
    setTarefas(tarefas.map((tarefa) => (tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa)))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      adicionarTarefa()
    }
  }

  const tarefasAtivas = tarefas.filter((tarefa) => !tarefa.concluida).length
  const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
      <header className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-4 px-6 shadow-md">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-xl sm:text-2xl font-bold">Bem-vindo ao Gerenciador de Tarefas</h1>
          <p className="text-sm sm:text-base mt-1 text-indigo-100">
            Organize suas tarefas de forma simples e eficiente
          </p>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
            Tasks para fazer ✅
          </h2>

          <div className="w-full mb-4 sm:mb-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
              <input
                type="text"
                value={novaTargefa}
                onChange={(e) => setNovaTargefa(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite uma nova tarefa..."
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
              />
              <div className="flex gap-2 sm:flex-shrink-0">
                <button
                  onClick={adicionarTarefa}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-200 font-medium shadow-lg whitespace-nowrap"
                >
                  Adicionar
                </button>
                <button
                  onClick={() => setTarefas([])}
                  className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm bg-gray-400 text-white rounded-xl hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 font-medium whitespace-nowrap"
                >
                  Limpar
                </button>
              </div>
            </div>
          </div>

          <div className="w-full space-y-2 sm:space-y-3 mb-4 sm:mb-6 max-h-96 overflow-y-auto">
            {tarefas.length === 0 ? (
              <div className="text-center py-6 sm:py-8 text-gray-500">
                <div className="text-3xl sm:text-4xl mb-2">📝</div>
                <p className="text-sm sm:text-base">Nenhuma tarefa ainda. Adicione uma acima!</p>
              </div>
            ) : (
              tarefas.map((tarefa) => (
                <div
                  key={tarefa.id}
                  className={`w-full flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border transition-all duration-200 ${
                    tarefa.concluida
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:shadow-md"
                      : "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => alternarConclusao(tarefa.id)}
                    className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                      tarefa.concluida
                        ? "bg-green-500 border-green-500 text-white hover:bg-green-600"
                        : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50"
                    }`}
                  >
                    {tarefa.concluida && (
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>


                  <span
                    className={`flex-1 text-sm sm:text-base break-words min-w-0 leading-relaxed transition-all duration-200 ${
                      tarefa.concluida ? "text-green-700 line-through opacity-75" : "text-gray-800"
                    }`}
                  >
                    {tarefa.texto}
                  </span>


                  <button
                    onClick={() => removerTarefa(tarefa.id)}
                    className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200 flex items-center justify-center font-bold text-xs sm:text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>


          {tarefas.length > 0 && (
            <div className="space-y-3">
              <div className="text-center p-3 sm:p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <p className="text-sm sm:text-base text-indigo-700 font-medium">
                  📊 Total: {tarefas.length} tarefa{tarefas.length !== 1 ? "s" : ""}
                </p>
              </div>


              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="text-center p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <p className="text-xs sm:text-sm text-blue-700 font-medium">🔄 Ativas: {tarefasAtivas}</p>
                </div>
                <div className="text-center p-2 sm:p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                  <p className="text-xs sm:text-sm text-green-700 font-medium">✅ Concluídas: {tarefasConcluidas}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>


      <footer className="w-full bg-gradient-to-r from-indigo-800 to-purple-900 text-white py-3 px-4 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} - Desenvolvido por{" "}
            <a
              href="https://github.com/Willyang10x"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-indigo-200 hover:text-white underline transition-colors"
            >
              Willyang10x
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
