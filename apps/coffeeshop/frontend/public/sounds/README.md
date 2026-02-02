# Sound Notification Files

Audio files for order notifications in the PWA.

## Files Included

| File | Purpose | Source |
|------|---------|--------|
| `order-ready.wav` | Played when order is ready for pickup | Chord.wav |
| `order-update.wav` | Played when order status changes (confirmed, preparing) | Beeper.wav |
| `success.wav` | General success sound | Calm.wav |
| `notification.wav` | Generic notification sound | Alarmed.wav |
| `error.wav` | Error sound | Sharp.wav |

## License

All sounds are from [akx/Notifications](https://github.com/akx/Notifications) repository.

**Dual License** - Choose between:
- CC Attribution 3.0 Unported
- CC0 Public Domain

## Usage

The sounds are loaded and played by the `useSoundNotifications` hook.
They are triggered automatically when order status changes.

```tsx
import { useSoundNotifications } from '@/hooks/useSoundNotifications';

function MyComponent() {
  const { playStatusSound, playSuccess, playError } = useSoundNotifications();

  // Play on status change
  playStatusSound('ready');

  // Play success manually
  playSuccess();
}
```

## Integration

The sounds are integrated in `ConnectedOrderHistoryPage`:
- Plays `order-ready.wav` when order becomes `ready`
- Plays `order-update.wav` when order becomes `confirmed` or `preparing`
- Plays `success.wav` when order is `delivered`

## Note

If audio files are missing, the hook will fail silently without crashing the app.
WAV format is used for better browser compatibility.
