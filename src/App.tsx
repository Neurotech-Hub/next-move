import { GoalsRail } from "./components/Goals/GoalsRail";
import { PathView } from "./components/Journey/PathView";
import { NextMoves } from "./components/Moves/NextMoves";
import { ResourcesCatalog } from "./components/Catalog/ResourcesCatalog";
import { Header } from "./components/UI/Header";
import { NavigatorProvider, useNavigator } from "./state/NavigatorContext";

function Shell() {
  const { view } = useNavigator();
  return (
    <div className="flex h-full flex-col bg-paper lg:overflow-hidden">
      <Header />
      {view === "resources" ? (
        <div className="min-h-0 flex-1 overflow-y-auto lg:overflow-hidden">
          <ResourcesCatalog />
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
          <GoalsRail />
          <main className="relative min-w-0 flex-1 border-y border-line lg:min-h-0 lg:border-y-0">
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
