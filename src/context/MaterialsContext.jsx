import { createContext, useContext, useEffect } from 'react';
import useStorage from '../hooks/useStorage';
import sampleData from '../data/sampleData';

const MaterialsContext = createContext(null);

export function MaterialsProvider({ children }) {
  const [materials, setMaterials] = useStorage('ziyonet_materials', []);

  const [seeded, setSeeded] = useStorage('ziyonet_seeded', false);

  // Auto-seed sample data once if storage is empty
  useEffect(() => {
    if (!seeded && materials.length === 0) {
      setMaterials(sampleData);
      setSeeded(true);
    }
  }, [seeded, materials.length, setMaterials, setSeeded]);

  const addMaterial = (material) => {
    const newItem = { ...material, id: Date.now().toString() };
    setMaterials((prev) => [newItem, ...prev]);
  };

  const removeMaterial = (id) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <MaterialsContext.Provider value={{ materials, addMaterial, removeMaterial }}>
      {children}
    </MaterialsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMaterials() {
  const ctx = useContext(MaterialsContext);
  if (!ctx) throw new Error('useMaterials must be used within MaterialsProvider');
  return ctx;
}

export default MaterialsContext;

