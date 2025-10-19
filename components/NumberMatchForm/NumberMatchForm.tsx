import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"
import { Trophy, RotateCcw, FileDown } from "lucide-react";

interface FormErrors {
  [key: string]: string | null | undefined;
  gameId?: string;
  duplicate?: string;
}

export default function NumberMatchForm({ onMatch, currentDrawn }: { onMatch: (matchData: any) => void, currentDrawn?: number[] }) {
  const [gameId, setGameId] = useState("");
  const [drawnNumbers, setDrawnNumbers] = useState<string[]>(Array(6).fill(""));
  const [errors, setErrors] = useState<FormErrors>({});

  const handleNumberChange = (index: number, value: string) => {
    const num = value.replace(/\D/g, "");
    if (num === "" || (parseInt(num) >= 1 && parseInt(num) <= 60)) {
      const newNumbers = [...drawnNumbers];
      newNumbers[index] = num;
      setDrawnNumbers(newNumbers);
      setErrors({ ...errors, [`number${index}` as string]: undefined });
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!gameId.trim()) {
      newErrors.gameId = "Número do jogo é obrigatório";
    }
    
    drawnNumbers.forEach((num, index) => {
      if (!num) {
        newErrors[`number${index}` as string] = "Obrigatório";
      } else {
        const numInt = parseInt(num);
        if (numInt < 1 || numInt > 60) {
          newErrors[`number${index}` as string] = "Deve ser entre 1 e 60";
        }
      }
    });

    const filledNumbers = drawnNumbers.filter((n: string) => n).map((n: string) => parseInt(n));
    const uniqueNumbers = new Set(filledNumbers);
    if (filledNumbers.length === 6 && uniqueNumbers.size !== 6) {
      newErrors.duplicate = "Os números devem ser únicos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCurrentGame = (newGame: any) => {
    try {
      // Obter jogos existentes do localStorage
      const storedGames = localStorage.getItem('megaSenaCurrentGame');
      const currentGames = storedGames ? JSON.parse(storedGames) : [];
      
      // Verificar se já existe um jogo com o mesmo gameId
      const gameExists = currentGames.some((game: any) => game.gameId === newGame.gameId);
      
      if (gameExists) {
        toast.warning("Jogo duplicado!", {
          description: `Já existe um jogo com o número ${newGame.gameId}.`,
        });
        return false;
      }
      
      // Adicionar novo jogo ao array
      const updatedGames = [...currentGames, newGame];
      
      // Salvar no localStorage
      localStorage.setItem('megaSenaCurrentGame', JSON.stringify(updatedGames));
      
      // Mostrar toast de sucesso
      toast.success("Jogo cadastrado!", {
        description: `Jogo ${newGame.gameId} foi adicionado com sucesso.`,
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar jogo:', error);
      toast.error("Erro ao cadastrar jogo", {
        description: "Não foi possível salvar o jogo. Tente novamente.",
      });
      return false;
    }
  };

  const handleMatch = () => {
    if (validateForm()) {
      const currentGame = {
        gameId: gameId.trim(),
        numbers: drawnNumbers.map((n: string) => parseInt(n)),
        date: new Date().toISOString()
      };

      const success = handleCurrentGame(currentGame);
      
      if (success) {
        // Chamar callback para atualizar a página
        onMatch(currentGame);
        
        // Limpar formulário após sucesso
        setGameId("");
        setDrawnNumbers(Array(6).fill(""));
        setErrors({});
      }
    }
  };

  const handleReset = () => {
    setGameId("");
    setDrawnNumbers(Array(6).fill(""));
    setErrors({});
  };

  const handleExportGames = () => {
    try {
      // Obter jogos do localStorage
      const storedGames = localStorage.getItem('megaSenaCurrentGame');
      const currentGames = storedGames ? JSON.parse(storedGames) : [];
      
      // Obter jogadores do localStorage
      const storedPlayers = localStorage.getItem('megaSenaPlayers');
      const currentPlayers = storedPlayers ? JSON.parse(storedPlayers) : [];
      
      // Calcular combinações para cada jogador
      const playersWithMatches = currentPlayers.map((player: any) => {
        const allMatchedNumbers = new Set<number>();
        currentGames.forEach((game: any) => {
          player.numbers.forEach((num: number) => {
            if (game.numbers.includes(num)) {
              allMatchedNumbers.add(num);
            }
          });
        });
        return {
          name: player.name,
          numbers: player.numbers,
          matches: allMatchedNumbers.size
        };
      });
      
      // Criar conteúdo CSV
      let csvContent = "data:text/csv;charset=utf-8,";
      
      // Seção de Jogos
      csvContent += "JOGOS CADASTRADOS\n";
      csvContent += "Número do Jogo,Número 1,Número 2,Número 3,Número 4,Número 5,Número 6,Data\n";
      currentGames.forEach((game: any) => {
        const date = game.date ? new Date(game.date).toLocaleString('pt-BR') : 'N/A';
        csvContent += `${game.gameId},${game.numbers.join(",")},${date}\n`;
      });
      
      // Espaço entre seções
      csvContent += "\n";
      
      // Seção de Jogadores
      csvContent += "JOGADORES CADASTRADOS\n";
      csvContent += "Nome,Número 1,Número 2,Número 3,Número 4,Número 5,Número 6,Combinações\n";
      playersWithMatches.forEach((player: any) => {
        csvContent += `${player.name},${player.numbers.join(",")},${player.matches}\n`;
      });
      
      // Download do arquivo
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `mega-sena-export-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Mostrar toast de sucesso
      toast.success("Exportação concluída!", {
        description: `Arquivo exportado com ${currentGames.length} jogo(s) e ${currentPlayers.length} jogador(es).`,
      });
    } catch (error) {
      console.error('Erro ao exportar:', error);
      toast.error("Erro na exportação", {
        description: "Não foi possível exportar os dados. Verifique o console para mais detalhes.",
      });
    }
  };

  return (
    <Card className="border-none shadow-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white">
      <CardHeader className="border-b border-blue-500 pb-6">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="w-6 h-6" />
          Encontre os números sorteados
        </CardTitle>
        <p className="text-sm text-blue-100 mt-1">Digite os números sorteados para este jogo</p>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Game ID Input */}
        <div className="space-y-2">
          <Label htmlFor="gameId" className="text-sm font-semibold text-blue-100">
            Número do jogo
          </Label>
          <Input
            id="gameId"
            value={gameId}
            onChange={(e) => {
              setGameId(e.target.value);
              setErrors({ ...errors, gameId: undefined });
            }}
            placeholder="Digite o número do jogo"
            className={`h-12 text-lg bg-white/10 border-white/20 text-white placeholder:text-blue-200 ${
              errors.gameId ? "border-red-400" : ""
            }`}
          />
          {errors.gameId && <p className="text-xs text-red-300">{errors.gameId}</p>}
        </div>

        {/* Drawn Numbers */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-blue-100">Números sorteados (1-60)</Label>
          <div className="grid grid-cols-3 gap-3">
            {drawnNumbers.map((num, index) => (
              <div key={index} className="space-y-1">
                <Input
                  type="text"
                  inputMode="numeric"
                  value={num}
                  onChange={(e) => handleNumberChange(index, e.target.value)}
                  placeholder={`Número ${index + 1}`}
                  maxLength={2}
                  className={`h-14 text-center text-xl font-bold bg-white/10 border-white/20 text-white placeholder:text-blue-200 ${
                    errors[`number${index}`] ? "border-red-400" : ""
                  }`}
                />
                {errors[`number${index}`] && (
                  <p className="text-xs text-red-300 text-center">{errors[`number${index}`]}</p>
                )}
              </div>
            ))}
          </div>
          {errors.duplicate && (
            <p className="text-sm text-red-300 text-center">{errors.duplicate}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 h-12 text-base font-semibold bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Limpar formulário
          </Button>
          <Button
            onClick={handleMatch}
            className="flex-1 h-12 text-base font-semibold bg-white text-blue-600 hover:bg-teal-500 hover:text-white cursor-pointer"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Cadastrar números
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={handleExportGames}
            variant="outline"
            className="flex-1 h-12 text-base font-semibold bg-purple-400 border-purple-500 text-white hover:bg-purple-500 hover:text-white cursor-pointer"
          >
            <FileDown className="w-4 h-4 mr-2" />
            Exportar jogos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}