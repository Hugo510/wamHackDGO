import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope } from 'lucide-react';
import { loginUser } from "@/store/AppSlice"; // Ajusta la ruta si es necesario
import { RootState } from "@/store/store"; // Ajusta la ruta si es necesario

export default function Component() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loginError, rol } = useSelector((state: RootState) => state.app);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Redirigir en base al rol del usuario
      if (rol === 'Administrador') {
        navigate('/dashboard_ceo');
      } else if (rol === 'Doctor') {
        navigate('/dashboard_doc');
      } else {
        navigate('/ai_text_selector'); // Redirige a un dashboard por defecto si no se reconoce el rol
      }
    }
  }, [isAuthenticated, rol, history]); // Dependencias para redirigir cuando cambia el estado de autenticación o el rol

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 sm:p-8 lg:p-12">
      <Card className="w-full p-4 sm:p-6 lg:p-8 box-border">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Stethoscope className="h-12 w-12 text-blue-600 sm:h-16 sm:w-16 lg:h-20 lg:w-20" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold">User Login</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 sm:p-3 lg:p-4"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 sm:p-3 lg:p-4"
              />
            </div>
            {loginError && (
              <div className="text-red-600 text-center">
                {loginError}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full py-2 sm:py-3 lg:py-4 text-lg sm:text-xl lg:text-2xl">
              Log in
            </Button>
          </CardFooter>
        </form>
      </Card>
      {isAuthenticated && (
        <div className="text-center mt-4 text-green-600">
          Login successful!
        </div>
      )}
    </div>
  );
}
