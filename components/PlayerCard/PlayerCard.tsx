import React from "react";
import { Card } from "@/components/ui/card";
import { Crown, Info, Trash, User, UserCircle, UserCircle2, Users, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
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

const avatarMap = {
  avatar1: { icon: User, color: "bg-blue-100 text-blue-600" },
  avatar2: { icon: UserCircle, color: "bg-purple-100 text-purple-600" },
  avatar3: { icon: UserCircle2, color: "bg-green-100 text-green-600" },
  avatar4: { icon: Users, color: "bg-orange-100 text-orange-600" }
};

interface Game {
  gameId: string;
  numbers: number[];
  date?: string;
}

export default function PlayerCard({ 
  player, 
  games = [], 
  onDelete 
}: { 
  player: any, 
  games: Game[],
  onDelete: (id: string) => void 
}) {
  const avatarInfo = avatarMap[player.avatar as keyof typeof avatarMap] || avatarMap.avatar1;
  const Icon = avatarInfo.icon;

  const getNumberStyle = (number: number) => {
    // Verificar se o número aparece em algum dos jogos
    const isMatched = games.some(game => game.numbers.includes(number));
    return `w-full aspect-square rounded-lg flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-lg font-bold transition-all duration-300 ${
      isMatched
        ? "bg-gradient-to-br from-red-100 to-red-200 text-red-700 shadow-md scale-110"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`;
  };

  // Calcular quantos números do jogador aparecem em todos os jogos
  const getMatchedNumbers = () => {
    if (games.length === 0) return [];
    
    const allMatchedNumbers = new Set<number>();
    games.forEach(game => {
      player.numbers.forEach((num: number) => {
        if (game.numbers.includes(num)) {
          allMatchedNumbers.add(num);
        }
      });
    });
    
    return Array.from(allMatchedNumbers);
  };

  const matchedNumbers = getMatchedNumbers();

  const handleDeletePlayer = (id: string) => {
    onDelete(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className={`p-3 sm:p-4 md:p-6 hover:shadow-xl transition-all duration-300 ${matchedNumbers.length === 6 ? 'border-3 border-yellow-500' : 'bg-gradient-to-br from-white to-gray-50'}`}>
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Avatar */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl ${avatarInfo.color} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate">{player.name}</h3>
              <h5 className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 truncate">{matchedNumbers.length === 6 ? 'Vencedor!' : ''}</h5>
            </div>
            <AlertDialog>
                  <AlertDialogTrigger asChild>
                  <div className="flex ml-auto bg-red-200 rounded-md p-1.5 sm:p-2 hover:bg-red-500 transition-all duration-300 cursor-pointer">
                      <Trash className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                      <AlertDialogHeader>
                          <AlertDialogTitle>Está ação não pode ser desfeita!</AlertDialogTitle>
                          <AlertDialogDescription>
                              Tem certeza que deseja remover o jogador <span className="font-bold text-blue-600">{player.name}</span> dos jogadores cadastrados?
                          </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-500 hover:bg-red-600 cursor-pointer" onClick={() => handleDeletePlayer(player.id)}>Continuar</AlertDialogAction>
                      </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialog>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
              {player.numbers.map((number: number, index: number) => (
                <motion.div
                  key={index}
                  className={getNumberStyle(number)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {number}
                </motion.div>
              ))}
            </div>
            {matchedNumbers.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 sm:mt-3 md:mt-4 lg:mt-5 px-2 sm:px-3 py-1 sm:py-1.5 bg-red-50 rounded-lg inline-block"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {matchedNumbers.length === 6 && <Crown className={`w-4 h-4 sm:w-5 sm:h-5 text-yellow-600`} />}
                  <span className={`text-xs sm:text-sm font-semibold ${matchedNumbers.length === 6 ? 'text-green-600' : 'text-red-700'}`}>
                    {matchedNumbers.length} {matchedNumbers.length === 1 ? "Combinação" : "Combinações"}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}