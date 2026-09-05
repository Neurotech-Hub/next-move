import { GoalsRail } from "./components/Goals/GoalsRail";
import { PathView } from "./components/Journey/PathView";
import { NextMoves } from "./components/Moves/NextMoves";
import { ResourcesCatalog } from "./components/Catalog/ResourcesCatalog";
import { Header } from "./components/UI/Header";
import { NavigatorProvider, useNavigator } from "./state/NavigatorContext";

function Shell() {
  const { view } = useNavigator();
  return (
    <div className="flex h-full flex-col overflow-hidden bg-paper">
      <Header />
      {view === "resources" ? (
        <div className="min-h-0 flex-1">
          <ResourcesCatalog />
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <GoalsRail />
          <main className="relative min-h-0 min-w-0 flex-1">
            <PathView />
          </main>
          <NextMoves />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <NavigatorProvider>
      <Shell />
    </NavigatorProvider>
  );
}
