import { Check, Prohibit } from '@phosphor-icons/react/dist/ssr';

interface HouseRulesProps {
  houseRules: Record<string, unknown>;
}

function extractRules(houseRules: Record<string, unknown>): string[] {
  // Handle { rules: string[] } shape
  if (Array.isArray(houseRules.rules)) {
    return houseRules.rules.filter((r): r is string => typeof r === 'string');
  }
  // Handle flat array (if stored directly)
  if (Array.isArray(houseRules)) {
    return (houseRules as unknown[]).filter((r): r is string => typeof r === 'string');
  }
  // Handle object with key-value pairs
  return Object.entries(houseRules).map(([key, value]) => {
    if (typeof value === 'string') return value;
    return key.replace(/_/g, ' ');
  });
}

function isNegativeRule(rule: string): boolean {
  const lower = rule.toLowerCase();
  return lower.startsWith('no ') || lower.includes('not allowed') || lower.includes('prohibited');
}

export default function HouseRules({ houseRules }: HouseRulesProps) {
  const rules = extractRules(houseRules);

  if (rules.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-foreground mb-3 text-lg font-semibold">House Rules</h2>
      <ul className="space-y-2">
        {rules.map((rule, i) => {
          const negative = isNegativeRule(rule);
          return (
            <li key={i} className="text-foreground-muted flex items-start gap-2.5 text-sm">
              {negative ? (
                <Prohibit size={18} weight="duotone" className="text-error mt-0.5 flex-shrink-0" />
              ) : (
                <Check size={18} weight="bold" className="text-success mt-0.5 flex-shrink-0" />
              )}
              <span>{rule}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
