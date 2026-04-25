import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Plus, Droplets, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WaterTrackerProps {
  target?: number; // ml, default 2500
}

const QUICK_ADD_OPTIONS = [
  { amount: 250, label: "250ml" },
  { amount: 500, label: "500ml" },
  { amount: 750, label: "750ml" },
];

export function WaterTracker({ target = 2500 }: WaterTrackerProps) {
  const [customAmount, setCustomAmount] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const { total, logs } = useQuery(api.waterLogs.getDailyTotal) ?? {
    total: 0,
    logs: [],
  };
  const logWater = useMutation(api.waterLogs.logWater);
  const removeLog = useMutation(api.waterLogs.remove);

  const percentage = Math.min((total / target) * 100, 100);
  const remaining = Math.max(target - total, 0);

  const handleQuickAdd = async (amount: number) => {
    await logWater({ amount });
  };

  const handleCustomAdd = async () => {
    const amount = parseInt(customAmount);
    if (amount > 0) {
      await logWater({ amount });
      setCustomAmount("");
      setShowCustom(false);
    }
  };

  const handleDelete = async (logId: string) => {
    await removeLog({ logId: logId as any });
  };

  return (
    <div className="space-y-4">
      {/* Progress Display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-cyan-500" />
          <span className="text-2xl font-black text-foreground">
            {total.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">
            / {target.toLocaleString()}ml
          </span>
        </div>
        <span className="text-sm font-bold text-cyan-600">
          {percentage.toFixed(0)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Quick Add Buttons */}
      <div className="flex items-center gap-2 pt-2">
        {QUICK_ADD_OPTIONS.map((option) => (
          <Button
            key={option.amount}
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdd(option.amount)}
            className="flex-1 border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300"
          >
            <Plus className="w-3 h-3 mr-1" />
            {option.label}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCustom(!showCustom)}
          className="border-cyan-200 hover:bg-cyan-50"
        >
          Custom
        </Button>
      </div>

      {/* Custom Amount Input */}
      {showCustom && (
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter ml..."
            className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <span className="text-sm text-muted-foreground">ml</span>
          <Button size="sm" onClick={handleCustomAdd}>
            Add
          </Button>
        </div>
      )}

      {/* Recent Logs */}
      {logs.length > 0 && (
        <div className="pt-4 border-t border-border">
          <p className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">
            Today&apos;s Log
          </p>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {logs.slice(0, 5).map((log) => (
              <div
                key={log._id}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <Droplets className="w-3 h-3 text-cyan-500" />
                  <span className="font-medium">+{log.amount}ml</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(log.loggedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(log._id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Remaining indicator */}
      {remaining > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          {remaining}ml more to reach your goal
        </p>
      )}
      {remaining === 0 && (
        <p className="text-xs text-cyan-600 font-bold text-center">
          Daily goal reached!
        </p>
      )}
    </div>
  );
}
