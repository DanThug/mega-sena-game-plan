import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, UserCircle, UserCircle2, Users } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Toast from "../Toast/Toast";

const avatarOptions = [
  { id: "avatar1", icon: User, color: "bg-blue-100 text-blue-600" },
  { id: "avatar2", icon: UserCircle, color: "bg-purple-100 text-purple-600" },
  { id: "avatar3", icon: UserCircle2, color: "bg-green-100 text-green-600" },
  { id: "avatar4", icon: Users, color: "bg-orange-100 text-orange-600" }
];

interface FormErrors {
  [key: string]: string | null | undefined;
  name?: string;
  duplicate?: string;
}

export default function PlayerForm({ onAddPlayer }: { onAddPlayer: (player: any) => void }) {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0].id);
  const [numbers, setNumbers] = useState(Array(6).fill(""));
  const [errors, setErrors] = useState<FormErrors>({});
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState(false);

  const handleNumberChange = (index: number, value: string) => {
    const num = value.replace(/\D/g, "");
    if (num === "" || (parseInt(num) >= 1 && parseInt(num) <= 60)) {
      const newNumbers = [...numbers];
      newNumbers[index] = num;
      setNumbers(newNumbers);
      setErrors({ ...errors, [`number${index}`]: null });
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }
    
    numbers.forEach((num, index) => {
      if (!num) {
        newErrors[`number${index}`] = "Obrigatório";
      } else {
        const numInt = parseInt(num);
        if (numInt < 1 || numInt > 60) {
          newErrors[`number${index}`] = "Deve ser entre 1 e 60";
        }
      }
    });

    const filledNumbers = numbers.filter(n => n).map(n => parseInt(n));
    const uniqueNumbers = new Set(filledNumbers);
    if (filledNumbers.length === 6 && uniqueNumbers.size !== 6) {
      newErrors.duplicate = "Os números devem ser únicos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
        handleShowToastMessage("Jogador adicionado com sucesso");
      onAddPlayer({
        name: name.trim(),
        avatar: selectedAvatar,
        numbers: numbers.map(n => parseInt(n))
      });
      handleReset();
    } else {
      handleShowToastMessage("Erro ao adicionar jogador");
    }
  };

  const handleReset = () => {
    setName("");
    setNumbers(Array(6).fill(""));
    setErrors({});
  };

  const handleShowToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
    <Card className="border-none shadow-xl bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="border-b border-gray-100 pb-6">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Cadastre um novo jogador
        </CardTitle>
        <p className="text-sm text-gray-500 mt-1">Cadastre um novo jogador com seus números sorteados</p>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Avatar Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700">Escolha um avatar</Label>
          <div className="grid grid-cols-4 gap-3">
            {avatarOptions.map(({ id, icon: Icon, color }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedAvatar(id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedAvatar === id
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className={`w-full aspect-square rounded-lg ${color} flex items-center justify-center cursor-pointer`}>
                  <Icon className="w-8 h-8" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
            Nome do jogador
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors({ ...errors, name: undefined });
            }}
            placeholder="Digite o nome do jogador"
            className={`h-12 text-lg placeholder:text-sm ${errors.name ? "border-red-400" : ""}`}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Number Inputs */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700">Números sorteados (1-60)</Label>
          <div className="grid grid-cols-3 gap-3">
            {numbers.map((num, index) => (
              <div key={index} className="space-y-1">
                <Input
                  id={`number${index}`}
                  type="text"
                  inputMode="numeric"
                  value={num}
                  onChange={(e) => handleNumberChange(index, e.target.value)}
                  placeholder={`Número ${index + 1}`}
                  maxLength={2}
                  className={`h-14 text-center text-xl placeholder:text-sm font-bold ${
                    errors[`number${index}`] ? "border-red-400" : ""
                  }`}
                />
                {errors[`number${index}`] && (
                  <p className="text-xs text-red-500 text-center">{errors[`number${index}`]}</p>
                )}
              </div>
            ))}
          </div>
          {errors.duplicate && (
            <p className="text-sm text-red-500 text-center">{errors.duplicate}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4">
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 h-12 text-base font-semibold hover:bg-gray-100 cursor-pointer"
          >
            Limpar formulário
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 cursor-pointer"
          >
            Adicionar jogador
          </Button>
        </div>
      </CardContent>
    </Card>
    <AnimatePresence mode="wait">
        {showToast && (
            <motion.div
                key="toast"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center mt-8"
            >
                <Toast>
                    {toastMessage}
                </Toast>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
}