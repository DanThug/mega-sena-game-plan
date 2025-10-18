'use client';

import React, { useState, useEffect } from "react";
import Player from "@/entities/Player.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Users, Sparkles, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PlayerForm from "@/components/PlayerForm/PlayerForm";
import NumberMatchForm from "@/components/NumberMatchForm/NumberMatchForm";
import PlayerCard from "@/components/PlayerCard/PlayerCard";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

interface Player {
  id: string;
  name: string;
  avatar: string;
  numbers: number[];
  createdAt: string;
}

interface DrawNumbers {
  gameId: string;
  numbers: number[];
  date?: string;
}

export default function MegaSenaPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawnGames, setDrawnGames] = useState<DrawNumbers[]>([]);

  useEffect(() => {
    loadPlayers();
    loadCurrentGame();
  }, []);

  const loadPlayers = async () => {
    setLoading(true);
    try {
      const storedPlayers = localStorage.getItem('megaSenaPlayers');
      if (storedPlayers) {
        setPlayers(JSON.parse(storedPlayers));
      } else {
        setPlayers([]);
      }
    } catch (error) {
      console.error('Erro ao carregar jogadores:', error);
      setPlayers([]);
    }
    setLoading(false);
  };

  const loadCurrentGame = () => {
    try {
      const storedGames = localStorage.getItem('megaSenaCurrentGame');
      if (storedGames) {
          const games = JSON.parse(storedGames);
        setDrawnGames(Array.isArray(games) ? games : []);
      } else {
        setDrawnGames([]);
      }
    } catch (error) {
      console.error('Erro ao carregar jogos:', error);
      setDrawnGames([]);
    }
  };

  const handleAddPlayer = async (playerData: any) => {
    try {
      // Gerar ID único para o jogador
      const newPlayer = {
        ...playerData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      // Obter jogadores existentes
      const storedPlayers = localStorage.getItem('megaSenaPlayers');
      const currentPlayers = storedPlayers ? JSON.parse(storedPlayers) : [];
      
      // Adicionar novo jogador
      const updatedPlayers = [...currentPlayers, newPlayer];
      
      // Salvar no localStorage
      localStorage.setItem('megaSenaPlayers', JSON.stringify(updatedPlayers));
      
      // Recarregar lista
      await loadPlayers();
    } catch (error) {
      console.error('Erro ao adicionar jogador:', error);
    }
  };

  const handleDeletePlayer = async (playerId: string) => {
    try {
      // Obter jogadores do localStorage
      const storedPlayers = localStorage.getItem('megaSenaPlayers');
      if (!storedPlayers) return;
      
      const currentPlayers: Player[] = JSON.parse(storedPlayers);
      
      // Filtrar para remover o jogador com o ID fornecido
      const updatedPlayers = currentPlayers.filter(player => player.id !== playerId);
      
      // Salvar lista atualizada no localStorage
      localStorage.setItem('megaSenaPlayers', JSON.stringify(updatedPlayers));
      
      // Recarregar lista de jogadores
      await loadPlayers();
    } catch (error) {
      console.error('Erro ao deletar jogador:', error);
    }
  };

  const handleMatch = (matchData: any) => {
    if (matchData) {
      // Recarregar jogos após adicionar novo
      loadCurrentGame();
    }
  };

  const handleDeleteCurrentGame = (gameId: string) => {
      try {
        // Obter jogos do localStorage
        const storedGames = localStorage.getItem('megaSenaCurrentGame');
        if (!storedGames) return;
        
        const currentGames: DrawNumbers[] = JSON.parse(storedGames);
        
        // Filtrar para remover o jogo com o gameId fornecido
        const updatedGames = currentGames.filter(game => game.gameId !== gameId);
        
        // Salvar lista atualizada no localStorage
        localStorage.setItem('megaSenaCurrentGame', JSON.stringify(updatedGames));
        
        // Recarregar lista de jogos
        loadCurrentGame();
      } catch (error) {
        console.error('Erro ao deletar jogo:', error);
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Mega Sena Plano de Jogos</h1>
              <p className="text-blue-100 mt-1">Acompanhe seus números sorteados e encontre ganhadores</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="register" className="space-y-6">
          <TabsList className="grid w-full max-w-xl mx-auto grid-cols-2 h-14 bg-white shadow-lg rounded-xl">
            <TabsTrigger
              value="register"
              className="text-base font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg cursor-pointer"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Novo Jogador
            </TabsTrigger>
            <TabsTrigger
              value="players"
              className="text-base font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg cursor-pointer"
            >
              <Users className="w-4 h-4 mr-2" />
              Jogadores & Partidas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="register" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <PlayerForm onAddPlayer={handleAddPlayer} />
            </motion.div>
          </TabsContent>

          <TabsContent value="players" className="space-y-6">
            {/* Number Match Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
            <NumberMatchForm
                onMatch={handleMatch}
                currentDrawn={undefined}
            />
            </motion.div>

            {/* Games List */}
            {drawnGames.length > 0 && (
              <div className="space-y-4 max-w-2xl mx-auto">
                <h2 className="text-xl font-bold text-gray-900">
                  Jogos Cadastrados ({drawnGames.length})
                </h2>
                <AnimatePresence>
                  {drawnGames.map((game) => (
                    <motion.div
                      key={game.gameId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 shadow-xl"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-blue-100 font-semibold">Jogo</p>
                            <p className="text-2xl font-bold">{game.gameId}</p>
                            {game.date && (
                              <p className="text-xs text-blue-200 mt-1">
                                {new Date(game.date).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            )}
                          </div>
                          <div className="flex ml-auto pr-6 gap-2">
                            {game.numbers.map((num, index) => (
                              <div
                                key={index}
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center font-bold text-lg"
                              >
                                {num}
                              </div>
                            ))}
                          </div>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <div className="flex bg-red-400 rounded-md p-2 hover:bg-red-500 transition-all duration-300 cursor-pointer">
                                        <Trash className="w-5 h-5 text-white" />
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Está ação não pode ser desfeita!</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Tem certeza que deseja remover o jogo {game.gameId} dos jogos cadastrados? Essa ação não pode ser desfeita.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDeleteCurrentGame(game.gameId)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Players List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Jogadores Cadastrados ({players.length})
                </h2>
              </div>

              {loading ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : players.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-lg">
                  <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum jogador cadastrado</h3>
                  <p className="text-gray-400">Cadastre seu primeiro jogador para começar</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence>
                    {players.map((player) => (
                      <PlayerCard
                        key={player.id}
                        player={player}
                        games={drawnGames}
                        onDelete={handleDeletePlayer}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}