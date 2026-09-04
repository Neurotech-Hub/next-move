import { ReactFlowProvider } from "@xyflow/react";
import { Header } from "./components/UI/Header";
import { InnovationMap } from "./components/Map/InnovationMap";
import { JourneyView } from "./components/Journey/JourneyView";
import { SidePanel } from "./components/Panel/SidePanel";
import { NavigatorProvider, useNavigator } from "./state/NavigatorContext";

function Shell() {
  const { view } = useNavigator();
  return (
    <div className="flex h-full flex-col overflow-hidden bg-paper">
      <Header />
      <div className="flex min-h-0 flex-1">
        <SidePanel />
        <main className="relative min-h-0 min-w-0 flex-1">
          {view === "journey" ? (
            <JourneyView />
          ) : (
            <ReactFlowProvider>
              <InnovationMap />
            </ReactFlowProvider>
          )}
        </main>
      </div>
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
