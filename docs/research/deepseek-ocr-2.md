# DeepSeek-OCR-2 — Ricerca

> **Scopo:** Valutazione modello OCR open-source per use case GUDBRO (CCCD, passaporti, menu).
> **Ultimo aggiornamento:** 2026-02-01

---

## Link Ufficiali

| Risorsa | Link |
|---------|------|
| GitHub | [github.com/deepseek-ai/DeepSeek-OCR-2](https://github.com/deepseek-ai/DeepSeek-OCR-2) |
| Hugging Face | [huggingface.co/deepseek-ai/DeepSeek-OCR-2](https://huggingface.co/deepseek-ai/DeepSeek-OCR-2) |
| Paper v2 (Visual Causal Flow) | [arXiv:2601.20552](https://arxiv.org/abs/2601.20552) |
| Paper v1 (Contexts Optical Compression) | [arXiv:2510.18234](https://arxiv.org/abs/2510.18234) |

---

## Specifiche Tecniche

| Aspetto | Dettaglio |
|---------|-----------|
| Tipo | Vision-Language Model (Image-Text-to-Text) |
| Parametri | **3B** |
| Precisione | BF16 (Brain Float 16-bit) |
| Formato | Safetensors |
| Licenza | **Apache 2.0** (uso commerciale libero) |
| Architettura | Visual Causal Flow — encoding visivo simile alla lettura umana |
| Attention | Flash Attention 2 |
| Lingue | Multilingue (non specificate singolarmente) |
| VRAM stimata | ~6-8 GB in BF16 |

### Risoluzione Dinamica

- Default: (0-6)x768x768 + 1x1024x1024 image patches
- Output: (0-6)x144 + 256 visual tokens
- Adaptive cropping mode disponibile

---

## Capacita'

| Funzione | Descrizione |
|----------|-------------|
| Document OCR | Estrazione testo ad alta accuratezza |
| Document-to-Markdown | Conversione documenti in markdown strutturato |
| Free OCR | Estrazione testo libera senza preservare layout |
| Grounding | Bounding box — sa DOVE si trova il testo nell'immagine |
| PDF Processing | Supportato via vLLM |
| Batch Processing | Configurabile per immagini multiple |

---

## Dipendenze

```
Python 3.12.9 + CUDA 11.8
torch==2.6.0
transformers==4.46.3
tokenizers==0.20.3
einops
addict
easydict
flash-attn==2.7.3 (--no-build-isolation)
```

---

## Uso Base

```python
from transformers import AutoModel, AutoTokenizer
import torch

model_name = 'deepseek-ai/DeepSeek-OCR-2'
tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
model = AutoModel.from_pretrained(
    model_name,
    _attn_implementation='flash_attention_2',
    trust_remote_code=True,
    use_safetensors=True
)
model = model.eval().cuda().to(torch.bfloat16)
```

### Prompt per Document → Markdown

```python
prompt = "<image>\n<|grounding|>Convert the document to markdown."
res = model.infer(
    tokenizer,
    prompt=prompt,
    image_file='your_image.jpg',
    output_path='output/',
    base_size=1024,
    image_size=768,
    crop_mode=True,
    save_results=True
)
```

### Prompt per Free OCR

```python
prompt = "<image>\nFree OCR."
```

---

## Use Case GUDBRO

### 1. Scanning CCCD (Priorita' Alta)

Carta d'identita' vietnamita con chip NFC. Il modello puo' estrarre:
- Ho ten (nome completo)
- So CCCD (numero ID)
- Ngay sinh (data di nascita)
- Gioi tinh (sesso)
- Que quan (luogo di origine)
- Noi thuong tru (residenza)

**Valore:** Killer feature per khai bao tam tru (registrazione polizia). Riduce tempo check-in da 3 min a 10 sec. Vedi `docs/research/accommodation-competitors.md` sezione 11.2.

### 2. Scanning Passaporto (Priorita' Alta)

Per ospiti stranieri — pre-compilazione form NA17:
- Nome, cognome, nazionalita'
- Numero passaporto
- Date validita'
- MRZ (Machine Readable Zone) — il grounding aiuta a localizzare i campi

### 3. Digitalizzazione Menu (Priorita' Media)

Onboarding merchant accelerato:
- Foto menu cartaceo → markdown strutturato
- Estrazione: nome piatto, prezzo, categoria, descrizione
- Import automatico nel sistema GUDBRO
- Particolarmente utile per i ~40.000 homestay che hanno menu scritti a mano

---

## Compatibilita' Infrastruttura

| Aspetto | Dettaglio |
|---------|-----------|
| Mac Studio M5 (pianificato) | 3B params = ~6-8 GB VRAM — ampiamente compatibile |
| Coesistenza | Puo' girare insieme a FLUX + Llama 4 senza problemi |
| Integrazione OpenClaw | Potenziale skill `ocr_scanner.py` nel sistema multi-agente |
| Alternativa cloud | Eseguibile su qualsiasi GPU con 8+ GB VRAM |

---

## Benchmark e Community

| Metrica | Valore |
|---------|--------|
| Download/mese | 102.941 |
| Citazioni paper v2 | 43 |
| Citazioni paper v1 | 91 |
| Demo spaces | 10+ su Hugging Face |
| Finetune disponibili | 3 |
| Versioni quantizzate | 1 |

---

## Competitor/Alternative

| Modello | Parametri | Licenza | Note |
|---------|-----------|---------|------|
| GOT-OCR2.0 | ~1B | Apache 2.0 | Predecessore, meno accurato |
| PaddleOCR | Variabili | Apache 2.0 | Baidu, buono per cinese/vietnamita |
| Tesseract | N/A | Apache 2.0 | Classico, meno accurato su documenti complessi |
| Google Vision API | Cloud | Pay-per-use | Ottimo ma costo ricorrente |
| Azure Document Intelligence | Cloud | Pay-per-use | Enterprise, costoso |

**DeepSeek-OCR-2 vince per:** rapporto qualita'/dimensione, grounding, markdown output, licenza aperta, eseguibilita' locale.

---

## TODO

- [ ] Test su immagini CCCD vietnamite reali
- [ ] Test su passaporti (MRZ extraction)
- [ ] Test su menu cartacei vietnamiti
- [ ] Benchmark velocita' su Mac M3 (prima del M5)
- [ ] Prototipo skill OpenClaw `ocr_scanner.py`
- [ ] Valutare versione quantizzata per dispositivi edge

---

_Ultimo aggiornamento: 2026-02-01_
