-- Ingredient Translations - Batch 1 (Core Ingredients)
-- Languages: Italian (it), Vietnamese (vi), Korean (ko), Japanese (ja)
-- Total: ~200 core ingredients

-- =====================================================
-- DAIRY / LATTICINI
-- =====================================================

INSERT INTO translations (entity_type, entity_id, field, locale, value, is_verified, translated_by) VALUES
-- Butter
('ingredient', 'ING_BUTTER', 'name', 'it', 'Burro', true, 'seed'),
('ingredient', 'ING_BUTTER', 'name', 'vi', 'Bơ', true, 'seed'),
('ingredient', 'ING_BUTTER', 'name', 'ko', '버터', true, 'seed'),
('ingredient', 'ING_BUTTER', 'name', 'ja', 'バター', true, 'seed'),
-- Milk
('ingredient', 'ING_MILK', 'name', 'it', 'Latte', true, 'seed'),
('ingredient', 'ING_MILK', 'name', 'vi', 'Sữa', true, 'seed'),
('ingredient', 'ING_MILK', 'name', 'ko', '우유', true, 'seed'),
('ingredient', 'ING_MILK', 'name', 'ja', '牛乳', true, 'seed'),
-- Cream
('ingredient', 'ING_CREAM', 'name', 'it', 'Panna', true, 'seed'),
('ingredient', 'ING_CREAM', 'name', 'vi', 'Kem tươi', true, 'seed'),
('ingredient', 'ING_CREAM', 'name', 'ko', '크림', true, 'seed'),
('ingredient', 'ING_CREAM', 'name', 'ja', 'クリーム', true, 'seed'),
-- Heavy Cream
('ingredient', 'ING_HEAVY_CREAM', 'name', 'it', 'Panna da montare', true, 'seed'),
('ingredient', 'ING_HEAVY_CREAM', 'name', 'vi', 'Kem béo', true, 'seed'),
('ingredient', 'ING_HEAVY_CREAM', 'name', 'ko', '헤비 크림', true, 'seed'),
('ingredient', 'ING_HEAVY_CREAM', 'name', 'ja', '生クリーム', true, 'seed'),
-- Yogurt
('ingredient', 'ING_YOGURT', 'name', 'it', 'Yogurt', true, 'seed'),
('ingredient', 'ING_YOGURT', 'name', 'vi', 'Sữa chua', true, 'seed'),
('ingredient', 'ING_YOGURT', 'name', 'ko', '요거트', true, 'seed'),
('ingredient', 'ING_YOGURT', 'name', 'ja', 'ヨーグルト', true, 'seed'),
-- Greek Yogurt
('ingredient', 'ING_GREEK_YOGURT', 'name', 'it', 'Yogurt greco', true, 'seed'),
('ingredient', 'ING_GREEK_YOGURT', 'name', 'vi', 'Sữa chua Hy Lạp', true, 'seed'),
('ingredient', 'ING_GREEK_YOGURT', 'name', 'ko', '그릭 요거트', true, 'seed'),
('ingredient', 'ING_GREEK_YOGURT', 'name', 'ja', 'ギリシャヨーグルト', true, 'seed'),
-- Sour Cream
('ingredient', 'ING_SOUR_CREAM', 'name', 'it', 'Panna acida', true, 'seed'),
('ingredient', 'ING_SOUR_CREAM', 'name', 'vi', 'Kem chua', true, 'seed'),
('ingredient', 'ING_SOUR_CREAM', 'name', 'ko', '사워크림', true, 'seed'),
('ingredient', 'ING_SOUR_CREAM', 'name', 'ja', 'サワークリーム', true, 'seed'),
-- Whipped Cream
('ingredient', 'ING_WHIPPED_CREAM', 'name', 'it', 'Panna montata', true, 'seed'),
('ingredient', 'ING_WHIPPED_CREAM', 'name', 'vi', 'Kem đánh bông', true, 'seed'),
('ingredient', 'ING_WHIPPED_CREAM', 'name', 'ko', '휘핑크림', true, 'seed'),
('ingredient', 'ING_WHIPPED_CREAM', 'name', 'ja', 'ホイップクリーム', true, 'seed'),
-- Ice Cream
('ingredient', 'ING_ICE_CREAM', 'name', 'it', 'Gelato', true, 'seed'),
('ingredient', 'ING_ICE_CREAM', 'name', 'vi', 'Kem', true, 'seed'),
('ingredient', 'ING_ICE_CREAM', 'name', 'ko', '아이스크림', true, 'seed'),
('ingredient', 'ING_ICE_CREAM', 'name', 'ja', 'アイスクリーム', true, 'seed'),
-- Coconut Milk
('ingredient', 'ING_COCONUT_MILK', 'name', 'it', 'Latte di cocco', true, 'seed'),
('ingredient', 'ING_COCONUT_MILK', 'name', 'vi', 'Nước cốt dừa', true, 'seed'),
('ingredient', 'ING_COCONUT_MILK', 'name', 'ko', '코코넛 밀크', true, 'seed'),
('ingredient', 'ING_COCONUT_MILK', 'name', 'ja', 'ココナッツミルク', true, 'seed')
ON CONFLICT DO NOTHING;

-- =====================================================
-- VEGETABLES / VERDURE
-- =====================================================

INSERT INTO translations (entity_type, entity_id, field, locale, value, is_verified, translated_by) VALUES
-- Tomato
('ingredient', 'ING_TOMATO', 'name', 'it', 'Pomodoro', true, 'seed'),
('ingredient', 'ING_TOMATO', 'name', 'vi', 'Cà chua', true, 'seed'),
('ingredient', 'ING_TOMATO', 'name', 'ko', '토마토', true, 'seed'),
('ingredient', 'ING_TOMATO', 'name', 'ja', 'トマト', true, 'seed'),
-- Cherry Tomato
('ingredient', 'ING_CHERRY_TOMATO', 'name', 'it', 'Pomodorino ciliegia', true, 'seed'),
('ingredient', 'ING_CHERRY_TOMATO', 'name', 'vi', 'Cà chua bi', true, 'seed'),
('ingredient', 'ING_CHERRY_TOMATO', 'name', 'ko', '방울토마토', true, 'seed'),
('ingredient', 'ING_CHERRY_TOMATO', 'name', 'ja', 'チェリートマト', true, 'seed'),
-- Onion
('ingredient', 'ING_ONION', 'name', 'it', 'Cipolla', true, 'seed'),
('ingredient', 'ING_ONION', 'name', 'vi', 'Hành tây', true, 'seed'),
('ingredient', 'ING_ONION', 'name', 'ko', '양파', true, 'seed'),
('ingredient', 'ING_ONION', 'name', 'ja', '玉ねぎ', true, 'seed'),
-- Garlic
('ingredient', 'ING_GARLIC', 'name', 'it', 'Aglio', true, 'seed'),
('ingredient', 'ING_GARLIC', 'name', 'vi', 'Tỏi', true, 'seed'),
('ingredient', 'ING_GARLIC', 'name', 'ko', '마늘', true, 'seed'),
('ingredient', 'ING_GARLIC', 'name', 'ja', 'ニンニク', true, 'seed'),
-- Carrot
('ingredient', 'ING_CARROT', 'name', 'it', 'Carota', true, 'seed'),
('ingredient', 'ING_CARROT', 'name', 'vi', 'Cà rốt', true, 'seed'),
('ingredient', 'ING_CARROT', 'name', 'ko', '당근', true, 'seed'),
('ingredient', 'ING_CARROT', 'name', 'ja', 'ニンジン', true, 'seed'),
-- Potato
('ingredient', 'ING_POTATO', 'name', 'it', 'Patata', true, 'seed'),
('ingredient', 'ING_POTATO', 'name', 'vi', 'Khoai tây', true, 'seed'),
('ingredient', 'ING_POTATO', 'name', 'ko', '감자', true, 'seed'),
('ingredient', 'ING_POTATO', 'name', 'ja', 'ジャガイモ', true, 'seed'),
-- Bell Pepper
('ingredient', 'ING_BELL_PEPPER', 'name', 'it', 'Peperone', true, 'seed'),
('ingredient', 'ING_BELL_PEPPER', 'name', 'vi', 'Ớt chuông', true, 'seed'),
('ingredient', 'ING_BELL_PEPPER', 'name', 'ko', '파프리카', true, 'seed'),
('ingredient', 'ING_BELL_PEPPER', 'name', 'ja', 'パプリカ', true, 'seed'),
-- Broccoli
('ingredient', 'ING_BROCCOLI', 'name', 'it', 'Broccoli', true, 'seed'),
('ingredient', 'ING_BROCCOLI', 'name', 'vi', 'Bông cải xanh', true, 'seed'),
('ingredient', 'ING_BROCCOLI', 'name', 'ko', '브로콜리', true, 'seed'),
('ingredient', 'ING_BROCCOLI', 'name', 'ja', 'ブロッコリー', true, 'seed'),
-- Cabbage
('ingredient', 'ING_CABBAGE', 'name', 'it', 'Cavolo', true, 'seed'),
('ingredient', 'ING_CABBAGE', 'name', 'vi', 'Bắp cải', true, 'seed'),
('ingredient', 'ING_CABBAGE', 'name', 'ko', '양배추', true, 'seed'),
('ingredient', 'ING_CABBAGE', 'name', 'ja', 'キャベツ', true, 'seed'),
-- Cauliflower
('ingredient', 'ING_CAULIFLOWER', 'name', 'it', 'Cavolfiore', true, 'seed'),
('ingredient', 'ING_CAULIFLOWER', 'name', 'vi', 'Bông cải trắng', true, 'seed'),
('ingredient', 'ING_CAULIFLOWER', 'name', 'ko', '콜리플라워', true, 'seed'),
('ingredient', 'ING_CAULIFLOWER', 'name', 'ja', 'カリフラワー', true, 'seed'),
-- Spinach
('ingredient', 'ING_SPINACH', 'name', 'it', 'Spinaci', true, 'seed'),
('ingredient', 'ING_SPINACH', 'name', 'vi', 'Rau chân vịt', true, 'seed'),
('ingredient', 'ING_SPINACH', 'name', 'ko', '시금치', true, 'seed'),
('ingredient', 'ING_SPINACH', 'name', 'ja', 'ほうれん草', true, 'seed'),
-- Lettuce
('ingredient', 'ING_LETTUCE', 'name', 'it', 'Lattuga', true, 'seed'),
('ingredient', 'ING_LETTUCE', 'name', 'vi', 'Xà lách', true, 'seed'),
('ingredient', 'ING_LETTUCE', 'name', 'ko', '상추', true, 'seed'),
('ingredient', 'ING_LETTUCE', 'name', 'ja', 'レタス', true, 'seed'),
-- Arugula
('ingredient', 'ING_ARUGULA', 'name', 'it', 'Rucola', true, 'seed'),
('ingredient', 'ING_ARUGULA', 'name', 'vi', 'Rau rocket', true, 'seed'),
('ingredient', 'ING_ARUGULA', 'name', 'ko', '루꼴라', true, 'seed'),
('ingredient', 'ING_ARUGULA', 'name', 'ja', 'ルッコラ', true, 'seed'),
-- Cucumber
('ingredient', 'ING_CUCUMBER', 'name', 'it', 'Cetriolo', true, 'seed'),
('ingredient', 'ING_CUCUMBER', 'name', 'vi', 'Dưa chuột', true, 'seed'),
('ingredient', 'ING_CUCUMBER', 'name', 'ko', '오이', true, 'seed'),
('ingredient', 'ING_CUCUMBER', 'name', 'ja', 'キュウリ', true, 'seed'),
-- Zucchini
('ingredient', 'ING_ZUCCHINI', 'name', 'it', 'Zucchina', true, 'seed'),
('ingredient', 'ING_ZUCCHINI', 'name', 'vi', 'Bí ngòi', true, 'seed'),
('ingredient', 'ING_ZUCCHINI', 'name', 'ko', '주키니', true, 'seed'),
('ingredient', 'ING_ZUCCHINI', 'name', 'ja', 'ズッキーニ', true, 'seed'),
-- Eggplant
('ingredient', 'ING_EGGPLANT', 'name', 'it', 'Melanzana', true, 'seed'),
('ingredient', 'ING_EGGPLANT', 'name', 'vi', 'Cà tím', true, 'seed'),
('ingredient', 'ING_EGGPLANT', 'name', 'ko', '가지', true, 'seed'),
('ingredient', 'ING_EGGPLANT', 'name', 'ja', 'ナス', true, 'seed'),
-- Mushroom
('ingredient', 'ING_MUSHROOM', 'name', 'it', 'Funghi', true, 'seed'),
('ingredient', 'ING_MUSHROOM', 'name', 'vi', 'Nấm', true, 'seed'),
('ingredient', 'ING_MUSHROOM', 'name', 'ko', '버섯', true, 'seed'),
('ingredient', 'ING_MUSHROOM', 'name', 'ja', 'きのこ', true, 'seed'),
-- Asparagus
('ingredient', 'ING_ASPARAGUS', 'name', 'it', 'Asparagi', true, 'seed'),
('ingredient', 'ING_ASPARAGUS', 'name', 'vi', 'Măng tây', true, 'seed'),
('ingredient', 'ING_ASPARAGUS', 'name', 'ko', '아스파라거스', true, 'seed'),
('ingredient', 'ING_ASPARAGUS', 'name', 'ja', 'アスパラガス', true, 'seed'),
-- Celery
('ingredient', 'ING_CELERY', 'name', 'it', 'Sedano', true, 'seed'),
('ingredient', 'ING_CELERY', 'name', 'vi', 'Cần tây', true, 'seed'),
('ingredient', 'ING_CELERY', 'name', 'ko', '셀러리', true, 'seed'),
('ingredient', 'ING_CELERY', 'name', 'ja', 'セロリ', true, 'seed'),
-- Pumpkin
('ingredient', 'ING_PUMPKIN', 'name', 'it', 'Zucca', true, 'seed'),
('ingredient', 'ING_PUMPKIN', 'name', 'vi', 'Bí đỏ', true, 'seed'),
('ingredient', 'ING_PUMPKIN', 'name', 'ko', '호박', true, 'seed'),
('ingredient', 'ING_PUMPKIN', 'name', 'ja', 'かぼちゃ', true, 'seed'),
-- Corn
('ingredient', 'ING_CORN', 'name', 'it', 'Mais', true, 'seed'),
('ingredient', 'ING_CORN', 'name', 'vi', 'Ngô', true, 'seed'),
('ingredient', 'ING_CORN', 'name', 'ko', '옥수수', true, 'seed'),
('ingredient', 'ING_CORN', 'name', 'ja', 'トウモロコシ', true, 'seed'),
-- Peas
('ingredient', 'ING_PEAS', 'name', 'it', 'Piselli', true, 'seed'),
('ingredient', 'ING_PEAS', 'name', 'vi', 'Đậu Hà Lan', true, 'seed'),
('ingredient', 'ING_PEAS', 'name', 'ko', '완두콩', true, 'seed'),
('ingredient', 'ING_PEAS', 'name', 'ja', 'グリーンピース', true, 'seed'),
-- Green Beans
('ingredient', 'ING_GREEN_BEANS', 'name', 'it', 'Fagiolini', true, 'seed'),
('ingredient', 'ING_GREEN_BEANS', 'name', 'vi', 'Đậu que', true, 'seed'),
('ingredient', 'ING_GREEN_BEANS', 'name', 'ko', '깍지콩', true, 'seed'),
('ingredient', 'ING_GREEN_BEANS', 'name', 'ja', 'インゲン', true, 'seed'),
-- Artichoke
('ingredient', 'ING_ARTICHOKE', 'name', 'it', 'Carciofo', true, 'seed'),
('ingredient', 'ING_ARTICHOKE', 'name', 'vi', 'Atiso', true, 'seed'),
('ingredient', 'ING_ARTICHOKE', 'name', 'ko', '아티초크', true, 'seed'),
('ingredient', 'ING_ARTICHOKE', 'name', 'ja', 'アーティチョーク', true, 'seed'),
-- Leek
('ingredient', 'ING_LEEK', 'name', 'it', 'Porro', true, 'seed'),
('ingredient', 'ING_LEEK', 'name', 'vi', 'Tỏi tây', true, 'seed'),
('ingredient', 'ING_LEEK', 'name', 'ko', '리크', true, 'seed'),
('ingredient', 'ING_LEEK', 'name', 'ja', 'リーキ', true, 'seed'),
-- Radish
('ingredient', 'ING_RADISH', 'name', 'it', 'Ravanello', true, 'seed'),
('ingredient', 'ING_RADISH', 'name', 'vi', 'Củ cải', true, 'seed'),
('ingredient', 'ING_RADISH', 'name', 'ko', '무', true, 'seed'),
('ingredient', 'ING_RADISH', 'name', 'ja', '大根', true, 'seed'),
-- Beetroot
('ingredient', 'ING_BEET', 'name', 'it', 'Barbabietola', true, 'seed'),
('ingredient', 'ING_BEET', 'name', 'vi', 'Củ dền', true, 'seed'),
('ingredient', 'ING_BEET', 'name', 'ko', '비트', true, 'seed'),
('ingredient', 'ING_BEET', 'name', 'ja', 'ビーツ', true, 'seed'),
-- Avocado
('ingredient', 'ING_AVOCADO', 'name', 'it', 'Avocado', true, 'seed'),
('ingredient', 'ING_AVOCADO', 'name', 'vi', 'Bơ', true, 'seed'),
('ingredient', 'ING_AVOCADO', 'name', 'ko', '아보카도', true, 'seed'),
('ingredient', 'ING_AVOCADO', 'name', 'ja', 'アボカド', true, 'seed')
ON CONFLICT DO NOTHING;

-- =====================================================
-- FRUITS / FRUTTA
-- =====================================================

INSERT INTO translations (entity_type, entity_id, field, locale, value, is_verified, translated_by) VALUES
-- Apple
('ingredient', 'ING_APPLE', 'name', 'it', 'Mela', true, 'seed'),
('ingredient', 'ING_APPLE', 'name', 'vi', 'Táo', true, 'seed'),
('ingredient', 'ING_APPLE', 'name', 'ko', '사과', true, 'seed'),
('ingredient', 'ING_APPLE', 'name', 'ja', 'りんご', true, 'seed'),
-- Banana
('ingredient', 'ING_BANANA', 'name', 'it', 'Banana', true, 'seed'),
('ingredient', 'ING_BANANA', 'name', 'vi', 'Chuối', true, 'seed'),
('ingredient', 'ING_BANANA', 'name', 'ko', '바나나', true, 'seed'),
('ingredient', 'ING_BANANA', 'name', 'ja', 'バナナ', true, 'seed'),
-- Orange
('ingredient', 'ING_ORANGE', 'name', 'it', 'Arancia', true, 'seed'),
('ingredient', 'ING_ORANGE', 'name', 'vi', 'Cam', true, 'seed'),
('ingredient', 'ING_ORANGE', 'name', 'ko', '오렌지', true, 'seed'),
('ingredient', 'ING_ORANGE', 'name', 'ja', 'オレンジ', true, 'seed'),
-- Lemon
('ingredient', 'ING_LEMON', 'name', 'it', 'Limone', true, 'seed'),
('ingredient', 'ING_LEMON', 'name', 'vi', 'Chanh vàng', true, 'seed'),
('ingredient', 'ING_LEMON', 'name', 'ko', '레몬', true, 'seed'),
('ingredient', 'ING_LEMON', 'name', 'ja', 'レモン', true, 'seed'),
-- Lime
('ingredient', 'ING_LIME', 'name', 'it', 'Lime', true, 'seed'),
('ingredient', 'ING_LIME', 'name', 'vi', 'Chanh xanh', true, 'seed'),
('ingredient', 'ING_LIME', 'name', 'ko', '라임', true, 'seed'),
('ingredient', 'ING_LIME', 'name', 'ja', 'ライム', true, 'seed'),
-- Strawberry
('ingredient', 'ING_STRAWBERRY', 'name', 'it', 'Fragola', true, 'seed'),
('ingredient', 'ING_STRAWBERRY', 'name', 'vi', 'Dâu tây', true, 'seed'),
('ingredient', 'ING_STRAWBERRY', 'name', 'ko', '딸기', true, 'seed'),
('ingredient', 'ING_STRAWBERRY', 'name', 'ja', 'いちご', true, 'seed'),
-- Raspberry
('ingredient', 'ING_RASPBERRY', 'name', 'it', 'Lampone', true, 'seed'),
('ingredient', 'ING_RASPBERRY', 'name', 'vi', 'Phúc bồn tử', true, 'seed'),
('ingredient', 'ING_RASPBERRY', 'name', 'ko', '라즈베리', true, 'seed'),
('ingredient', 'ING_RASPBERRY', 'name', 'ja', 'ラズベリー', true, 'seed'),
-- Blueberry
('ingredient', 'ING_BLUEBERRY', 'name', 'it', 'Mirtillo', true, 'seed'),
('ingredient', 'ING_BLUEBERRY', 'name', 'vi', 'Việt quất', true, 'seed'),
('ingredient', 'ING_BLUEBERRY', 'name', 'ko', '블루베리', true, 'seed'),
('ingredient', 'ING_BLUEBERRY', 'name', 'ja', 'ブルーベリー', true, 'seed'),
-- Grape
('ingredient', 'ING_GRAPE', 'name', 'it', 'Uva', true, 'seed'),
('ingredient', 'ING_GRAPE', 'name', 'vi', 'Nho', true, 'seed'),
('ingredient', 'ING_GRAPE', 'name', 'ko', '포도', true, 'seed'),
('ingredient', 'ING_GRAPE', 'name', 'ja', 'ブドウ', true, 'seed'),
-- Peach
('ingredient', 'ING_PEACH', 'name', 'it', 'Pesca', true, 'seed'),
('ingredient', 'ING_PEACH', 'name', 'vi', 'Đào', true, 'seed'),
('ingredient', 'ING_PEACH', 'name', 'ko', '복숭아', true, 'seed'),
('ingredient', 'ING_PEACH', 'name', 'ja', '桃', true, 'seed'),
-- Pear
('ingredient', 'ING_PEAR', 'name', 'it', 'Pera', true, 'seed'),
('ingredient', 'ING_PEAR', 'name', 'vi', 'Lê', true, 'seed'),
('ingredient', 'ING_PEAR', 'name', 'ko', '배', true, 'seed'),
('ingredient', 'ING_PEAR', 'name', 'ja', '梨', true, 'seed'),
-- Mango
('ingredient', 'ING_MANGO', 'name', 'it', 'Mango', true, 'seed'),
('ingredient', 'ING_MANGO', 'name', 'vi', 'Xoài', true, 'seed'),
('ingredient', 'ING_MANGO', 'name', 'ko', '망고', true, 'seed'),
('ingredient', 'ING_MANGO', 'name', 'ja', 'マンゴー', true, 'seed'),
-- Pineapple
('ingredient', 'ING_PINEAPPLE', 'name', 'it', 'Ananas', true, 'seed'),
('ingredient', 'ING_PINEAPPLE', 'name', 'vi', 'Dứa', true, 'seed'),
('ingredient', 'ING_PINEAPPLE', 'name', 'ko', '파인애플', true, 'seed'),
('ingredient', 'ING_PINEAPPLE', 'name', 'ja', 'パイナップル', true, 'seed'),
-- Watermelon
('ingredient', 'ING_WATERMELON', 'name', 'it', 'Anguria', true, 'seed'),
('ingredient', 'ING_WATERMELON', 'name', 'vi', 'Dưa hấu', true, 'seed'),
('ingredient', 'ING_WATERMELON', 'name', 'ko', '수박', true, 'seed'),
('ingredient', 'ING_WATERMELON', 'name', 'ja', 'スイカ', true, 'seed'),
-- Melon
('ingredient', 'ING_MELON', 'name', 'it', 'Melone', true, 'seed'),
('ingredient', 'ING_MELON', 'name', 'vi', 'Dưa lưới', true, 'seed'),
('ingredient', 'ING_MELON', 'name', 'ko', '멜론', true, 'seed'),
('ingredient', 'ING_MELON', 'name', 'ja', 'メロン', true, 'seed'),
-- Cherry
('ingredient', 'ING_CHERRY', 'name', 'it', 'Ciliegia', true, 'seed'),
('ingredient', 'ING_CHERRY', 'name', 'vi', 'Anh đào', true, 'seed'),
('ingredient', 'ING_CHERRY', 'name', 'ko', '체리', true, 'seed'),
('ingredient', 'ING_CHERRY', 'name', 'ja', 'さくらんぼ', true, 'seed'),
-- Kiwi
('ingredient', 'ING_KIWI', 'name', 'it', 'Kiwi', true, 'seed'),
('ingredient', 'ING_KIWI', 'name', 'vi', 'Kiwi', true, 'seed'),
('ingredient', 'ING_KIWI', 'name', 'ko', '키위', true, 'seed'),
('ingredient', 'ING_KIWI', 'name', 'ja', 'キウイ', true, 'seed'),
-- Coconut
('ingredient', 'ING_COCONUT', 'name', 'it', 'Cocco', true, 'seed'),
('ingredient', 'ING_COCONUT', 'name', 'vi', 'Dừa', true, 'seed'),
('ingredient', 'ING_COCONUT', 'name', 'ko', '코코넛', true, 'seed'),
('ingredient', 'ING_COCONUT', 'name', 'ja', 'ココナッツ', true, 'seed'),
-- Passion Fruit
('ingredient', 'ING_PASSION_FRUIT', 'name', 'it', 'Frutto della passione', true, 'seed'),
('ingredient', 'ING_PASSION_FRUIT', 'name', 'vi', 'Chanh dây', true, 'seed'),
('ingredient', 'ING_PASSION_FRUIT', 'name', 'ko', '패션프루트', true, 'seed'),
('ingredient', 'ING_PASSION_FRUIT', 'name', 'ja', 'パッションフルーツ', true, 'seed'),
-- Fig
('ingredient', 'ING_FIG', 'name', 'it', 'Fico', true, 'seed'),
('ingredient', 'ING_FIG', 'name', 'vi', 'Quả sung', true, 'seed'),
('ingredient', 'ING_FIG', 'name', 'ko', '무화과', true, 'seed'),
('ingredient', 'ING_FIG', 'name', 'ja', 'いちじく', true, 'seed')
ON CONFLICT DO NOTHING;

-- =====================================================
-- HERBS / ERBE
-- =====================================================

INSERT INTO translations (entity_type, entity_id, field, locale, value, is_verified, translated_by) VALUES
-- Basil
('ingredient', 'ING_BASIL', 'name', 'it', 'Basilico', true, 'seed'),
('ingredient', 'ING_BASIL', 'name', 'vi', 'Húng quế', true, 'seed'),
('ingredient', 'ING_BASIL', 'name', 'ko', '바질', true, 'seed'),
('ingredient', 'ING_BASIL', 'name', 'ja', 'バジル', true, 'seed'),
-- Parsley
('ingredient', 'ING_PARSLEY', 'name', 'it', 'Prezzemolo', true, 'seed'),
('ingredient', 'ING_PARSLEY', 'name', 'vi', 'Mùi tây', true, 'seed'),
('ingredient', 'ING_PARSLEY', 'name', 'ko', '파슬리', true, 'seed'),
('ingredient', 'ING_PARSLEY', 'name', 'ja', 'パセリ', true, 'seed'),
-- Cilantro
('ingredient', 'ING_CILANTRO', 'name', 'it', 'Coriandolo', true, 'seed'),
('ingredient', 'ING_CILANTRO', 'name', 'vi', 'Rau mùi', true, 'seed'),
('ingredient', 'ING_CILANTRO', 'name', 'ko', '고수', true, 'seed'),
('ingredient', 'ING_CILANTRO', 'name', 'ja', 'パクチー', true, 'seed'),
-- Mint
('ingredient', 'ING_MINT', 'name', 'it', 'Menta', true, 'seed'),
('ingredient', 'ING_MINT', 'name', 'vi', 'Bạc hà', true, 'seed'),
('ingredient', 'ING_MINT', 'name', 'ko', '민트', true, 'seed'),
('ingredient', 'ING_MINT', 'name', 'ja', 'ミント', true, 'seed'),
-- Rosemary
('ingredient', 'ING_ROSEMARY', 'name', 'it', 'Rosmarino', true, 'seed'),
('ingredient', 'ING_ROSEMARY', 'name', 'vi', 'Hương thảo', true, 'seed'),
('ingredient', 'ING_ROSEMARY', 'name', 'ko', '로즈마리', true, 'seed'),
('ingredient', 'ING_ROSEMARY', 'name', 'ja', 'ローズマリー', true, 'seed'),
-- Thyme
('ingredient', 'ING_THYME', 'name', 'it', 'Timo', true, 'seed'),
('ingredient', 'ING_THYME', 'name', 'vi', 'Cỏ xạ hương', true, 'seed'),
('ingredient', 'ING_THYME', 'name', 'ko', '타임', true, 'seed'),
('ingredient', 'ING_THYME', 'name', 'ja', 'タイム', true, 'seed'),
-- Oregano
('ingredient', 'ING_OREGANO', 'name', 'it', 'Origano', true, 'seed'),
('ingredient', 'ING_OREGANO', 'name', 'vi', 'Lá oregano', true, 'seed'),
('ingredient', 'ING_OREGANO', 'name', 'ko', '오레가노', true, 'seed'),
('ingredient', 'ING_OREGANO', 'name', 'ja', 'オレガノ', true, 'seed'),
-- Sage
('ingredient', 'ING_SAGE', 'name', 'it', 'Salvia', true, 'seed'),
('ingredient', 'ING_SAGE', 'name', 'vi', 'Xô thơm', true, 'seed'),
('ingredient', 'ING_SAGE', 'name', 'ko', '세이지', true, 'seed'),
('ingredient', 'ING_SAGE', 'name', 'ja', 'セージ', true, 'seed'),
-- Dill
('ingredient', 'ING_DILL', 'name', 'it', 'Aneto', true, 'seed'),
('ingredient', 'ING_DILL', 'name', 'vi', 'Thì là', true, 'seed'),
('ingredient', 'ING_DILL', 'name', 'ko', '딜', true, 'seed'),
('ingredient', 'ING_DILL', 'name', 'ja', 'ディル', true, 'seed'),
-- Chives
('ingredient', 'ING_CHIVES', 'name', 'it', 'Erba cipollina', true, 'seed'),
('ingredient', 'ING_CHIVES', 'name', 'vi', 'Hẹ tây', true, 'seed'),
('ingredient', 'ING_CHIVES', 'name', 'ko', '차이브', true, 'seed'),
('ingredient', 'ING_CHIVES', 'name', 'ja', 'チャイブ', true, 'seed'),
-- Bay Leaf
('ingredient', 'ING_BAY_LEAF', 'name', 'it', 'Alloro', true, 'seed'),
('ingredient', 'ING_BAY_LEAF', 'name', 'vi', 'Lá nguyệt quế', true, 'seed'),
('ingredient', 'ING_BAY_LEAF', 'name', 'ko', '월계수 잎', true, 'seed'),
('ingredient', 'ING_BAY_LEAF', 'name', 'ja', 'ローリエ', true, 'seed'),
-- Tarragon
('ingredient', 'ING_TARRAGON', 'name', 'it', 'Dragoncello', true, 'seed'),
('ingredient', 'ING_TARRAGON', 'name', 'vi', 'Ngải giấm', true, 'seed'),
('ingredient', 'ING_TARRAGON', 'name', 'ko', '타라곤', true, 'seed'),
('ingredient', 'ING_TARRAGON', 'name', 'ja', 'タラゴン', true, 'seed')
ON CONFLICT DO NOTHING;

-- =====================================================
-- MEATS / CARNI
-- =====================================================

INSERT INTO translations (entity_type, entity_id, field, locale, value, is_verified, translated_by) VALUES
-- Chicken
('ingredient', 'ING_CHICKEN', 'name', 'it', 'Pollo', true, 'seed'),
('ingredient', 'ING_CHICKEN', 'name', 'vi', 'Gà', true, 'seed'),
('ingredient', 'ING_CHICKEN', 'name', 'ko', '닭고기', true, 'seed'),
('ingredient', 'ING_CHICKEN', 'name', 'ja', '鶏肉', true, 'seed'),
-- Chicken Breast
('ingredient', 'ING_CHICKEN_BREAST', 'name', 'it', 'Petto di pollo', true, 'seed'),
('ingredient', 'ING_CHICKEN_BREAST', 'name', 'vi', 'Ức gà', true, 'seed'),
('ingredient', 'ING_CHICKEN_BREAST', 'name', 'ko', '닭가슴살', true, 'seed'),
('ingredient', 'ING_CHICKEN_BREAST', 'name', 'ja', '鶏むね肉', true, 'seed'),
-- Chicken Thigh
('ingredient', 'ING_CHICKEN_THIGH', 'name', 'it', 'Coscia di pollo', true, 'seed'),
('ingredient', 'ING_CHICKEN_THIGH', 'name', 'vi', 'Đùi gà', true, 'seed'),
('ingredient', 'ING_CHICKEN_THIGH', 'name', 'ko', '닭다리살', true, 'seed'),
('ingredient', 'ING_CHICKEN_THIGH', 'name', 'ja', '鶏もも肉', true, 'seed'),
-- Beef
('ingredient', 'ING_BEEF', 'name', 'it', 'Manzo', true, 'seed'),
('ingredient', 'ING_BEEF', 'name', 'vi', 'Thịt bò', true, 'seed'),
('ingredient', 'ING_BEEF', 'name', 'ko', '소고기', true, 'seed'),
('ingredient', 'ING_BEEF', 'name', 'ja', '牛肉', true, 'seed'),
-- Pork
('ingredient', 'ING_PORK', 'name', 'it', 'Maiale', true, 'seed'),
('ingredient', 'ING_PORK', 'name', 'vi', 'Thịt heo', true, 'seed'),
('ingredient', 'ING_PORK', 'name', 'ko', '돼지고기', true, 'seed'),
('ingredient', 'ING_PORK', 'name', 'ja', '豚肉', true, 'seed'),
-- Lamb
('ingredient', 'ING_LAMB', 'name', 'it', 'Agnello', true, 'seed'),
('ingredient', 'ING_LAMB', 'name', 'vi', 'Thịt cừu', true, 'seed'),
('ingredient', 'ING_LAMB', 'name', 'ko', '양고기', true, 'seed'),
('ingredient', 'ING_LAMB', 'name', 'ja', 'ラム肉', true, 'seed'),
-- Duck
('ingredient', 'ING_DUCK', 'name', 'it', 'Anatra', true, 'seed'),
('ingredient', 'ING_DUCK', 'name', 'vi', 'Vịt', true, 'seed'),
('ingredient', 'ING_DUCK', 'name', 'ko', '오리', true, 'seed'),
('ingredient', 'ING_DUCK', 'name', 'ja', '鴨', true, 'seed'),
-- Turkey
('ingredient', 'ING_TURKEY', 'name', 'it', 'Tacchino', true, 'seed'),
('ingredient', 'ING_TURKEY', 'name', 'vi', 'Gà tây', true, 'seed'),
('ingredient', 'ING_TURKEY', 'name', 'ko', '칠면조', true, 'seed'),
('ingredient', 'ING_TURKEY', 'name', 'ja', '七面鳥', true, 'seed'),
-- Bacon
('ingredient', 'ING_BACON', 'name', 'it', 'Pancetta', true, 'seed'),
('ingredient', 'ING_BACON', 'name', 'vi', 'Thịt xông khói', true, 'seed'),
('ingredient', 'ING_BACON', 'name', 'ko', '베이컨', true, 'seed'),
('ingredient', 'ING_BACON', 'name', 'ja', 'ベーコン', true, 'seed'),
-- Ham
('ingredient', 'ING_HAM', 'name', 'it', 'Prosciutto', true, 'seed'),
('ingredient', 'ING_HAM', 'name', 'vi', 'Giăm bông', true, 'seed'),
('ingredient', 'ING_HAM', 'name', 'ko', '햄', true, 'seed'),
('ingredient', 'ING_HAM', 'name', 'ja', 'ハム', true, 'seed'),
-- Sausage
('ingredient', 'ING_SAUSAGE', 'name', 'it', 'Salsiccia', true, 'seed'),
('ingredient', 'ING_SAUSAGE', 'name', 'vi', 'Xúc xích', true, 'seed'),
('ingredient', 'ING_SAUSAGE', 'name', 'ko', '소시지', true, 'seed'),
('ingredient', 'ING_SAUSAGE', 'name', 'ja', 'ソーセージ', true, 'seed'),
-- Ground Beef
('ingredient', 'ING_GROUND_BEEF', 'name', 'it', 'Carne macinata', true, 'seed'),
('ingredient', 'ING_GROUND_BEEF', 'name', 'vi', 'Thịt bò xay', true, 'seed'),
('ingredient', 'ING_GROUND_BEEF', 'name', 'ko', '다진 소고기', true, 'seed'),
('ingredient', 'ING_GROUND_BEEF', 'name', 'ja', '牛ひき肉', true, 'seed')
ON CONFLICT DO NOTHING;

-- =====================================================
-- SEAFOOD / FRUTTI DI MARE
-- =====================================================

INSERT INTO translations (entity_type, entity_id, field, locale, value, is_verified, translated_by) VALUES
-- Salmon
('ingredient', 'ING_SALMON', 'name', 'it', 'Salmone', true, 'seed'),
('ingredient', 'ING_SALMON', 'name', 'vi', 'Cá hồi', true, 'seed'),
('ingredient', 'ING_SALMON', 'name', 'ko', '연어', true, 'seed'),
('ingredient', 'ING_SALMON', 'name', 'ja', 'サーモン', true, 'seed'),
-- Tuna
('ingredient', 'ING_TUNA', 'name', 'it', 'Tonno', true, 'seed'),
('ingredient', 'ING_TUNA', 'name', 'vi', 'Cá ngừ', true, 'seed'),
('ingredient', 'ING_TUNA', 'name', 'ko', '참치', true, 'seed'),
('ingredient', 'ING_TUNA', 'name', 'ja', 'マグロ', true, 'seed'),
-- Shrimp
('ingredient', 'ING_SHRIMP', 'name', 'it', 'Gamberetti', true, 'seed'),
('ingredient', 'ING_SHRIMP', 'name', 'vi', 'Tôm', true, 'seed'),
('ingredient', 'ING_SHRIMP', 'name', 'ko', '새우', true, 'seed'),
('ingredient', 'ING_SHRIMP', 'name', 'ja', 'エビ', true, 'seed'),
-- Lobster
('ingredient', 'ING_LOBSTER', 'name', 'it', 'Aragosta', true, 'seed'),
('ingredient', 'ING_LOBSTER', 'name', 'vi', 'Tôm hùm', true, 'seed'),
('ingredient', 'ING_LOBSTER', 'name', 'ko', '랍스터', true, 'seed'),
('ingredient', 'ING_LOBSTER', 'name', 'ja', 'ロブスター', true, 'seed'),
-- Crab
('ingredient', 'ING_CRAB', 'name', 'it', 'Granchio', true, 'seed'),
('ingredient', 'ING_CRAB', 'name', 'vi', 'Cua', true, 'seed'),
('ingredient', 'ING_CRAB', 'name', 'ko', '게', true, 'seed'),
('ingredient', 'ING_CRAB', 'name', 'ja', 'カニ', true, 'seed'),
-- Scallop
('ingredient', 'ING_SCALLOP', 'name', 'it', 'Capesante', true, 'seed'),
('ingredient', 'ING_SCALLOP', 'name', 'vi', 'Sò điệp', true, 'seed'),
('ingredient', 'ING_SCALLOP', 'name', 'ko', '가리비', true, 'seed'),
('ingredient', 'ING_SCALLOP', 'name', 'ja', 'ホタテ', true, 'seed'),
-- Mussel
('ingredient', 'ING_MUSSEL', 'name', 'it', 'Cozze', true, 'seed'),
('ingredient', 'ING_MUSSEL', 'name', 'vi', 'Vẹm', true, 'seed'),
('ingredient', 'ING_MUSSEL', 'name', 'ko', '홍합', true, 'seed'),
('ingredient', 'ING_MUSSEL', 'name', 'ja', 'ムール貝', true, 'seed'),
-- Clam
('ingredient', 'ING_CLAM', 'name', 'it', 'Vongole', true, 'seed'),
('ingredient', 'ING_CLAM', 'name', 'vi', 'Nghêu', true, 'seed'),
('ingredient', 'ING_CLAM', 'name', 'ko', '조개', true, 'seed'),
('ingredient', 'ING_CLAM', 'name', 'ja', 'アサリ', true, 'seed'),
-- Octopus
('ingredient', 'ING_OCTOPUS', 'name', 'it', 'Polpo', true, 'seed'),
('ingredient', 'ING_OCTOPUS', 'name', 'vi', 'Bạch tuộc', true, 'seed'),
('ingredient', 'ING_OCTOPUS', 'name', 'ko', '문어', true, 'seed'),
('ingredient', 'ING_OCTOPUS', 'name', 'ja', 'タコ', true, 'seed'),
-- Squid
('ingredient', 'ING_SQUID', 'name', 'it', 'Calamaro', true, 'seed'),
('ingredient', 'ING_SQUID', 'name', 'vi', 'Mực', true, 'seed'),
('ingredient', 'ING_SQUID', 'name', 'ko', '오징어', true, 'seed'),
('ingredient', 'ING_SQUID', 'name', 'ja', 'イカ', true, 'seed'),
-- Cod
('ingredient', 'ING_COD', 'name', 'it', 'Merluzzo', true, 'seed'),
('ingredient', 'ING_COD', 'name', 'vi', 'Cá tuyết', true, 'seed'),
('ingredient', 'ING_COD', 'name', 'ko', '대구', true, 'seed'),
('ingredient', 'ING_COD', 'name', 'ja', 'タラ', true, 'seed'),
-- Sea Bass
('ingredient', 'ING_SEA_BASS', 'name', 'it', 'Branzino', true, 'seed'),
('ingredient', 'ING_SEA_BASS', 'name', 'vi', 'Cá vược', true, 'seed'),
('ingredient', 'ING_SEA_BASS', 'name', 'ko', '농어', true, 'seed'),
('ingredient', 'ING_SEA_BASS', 'name', 'ja', 'スズキ', true, 'seed'),
-- Anchovy
('ingredient', 'ING_ANCHOVY', 'name', 'it', 'Acciuga', true, 'seed'),
('ingredient', 'ING_ANCHOVY', 'name', 'vi', 'Cá cơm', true, 'seed'),
('ingredient', 'ING_ANCHOVY', 'name', 'ko', '멸치', true, 'seed'),
('ingredient', 'ING_ANCHOVY', 'name', 'ja', 'アンチョビ', true, 'seed')
ON CONFLICT DO NOTHING;

-- =====================================================
-- SPICES / SPEZIE
-- =====================================================

INSERT INTO translations (entity_type, entity_id, field, locale, value, is_verified, translated_by) VALUES
-- Salt
('ingredient', 'ING_SALT', 'name', 'it', 'Sale', true, 'seed'),
('ingredient', 'ING_SALT', 'name', 'vi', 'Muối', true, 'seed'),
('ingredient', 'ING_SALT', 'name', 'ko', '소금', true, 'seed'),
('ingredient', 'ING_SALT', 'name', 'ja', '塩', true, 'seed'),
-- Black Pepper
('ingredient', 'ING_BLACK_PEPPER', 'name', 'it', 'Pepe nero', true, 'seed'),
('ingredient', 'ING_BLACK_PEPPER', 'name', 'vi', 'Tiêu đen', true, 'seed'),
('ingredient', 'ING_BLACK_PEPPER', 'name', 'ko', '후추', true, 'seed'),
('ingredient', 'ING_BLACK_PEPPER', 'name', 'ja', '黒胡椒', true, 'seed'),
-- Paprika
('ingredient', 'ING_PAPRIKA', 'name', 'it', 'Paprika', true, 'seed'),
('ingredient', 'ING_PAPRIKA', 'name', 'vi', 'Bột ớt đỏ', true, 'seed'),
('ingredient', 'ING_PAPRIKA', 'name', 'ko', '파프리카', true, 'seed'),
('ingredient', 'ING_PAPRIKA', 'name', 'ja', 'パプリカ', true, 'seed'),
-- Cumin
('ingredient', 'ING_CUMIN', 'name', 'it', 'Cumino', true, 'seed'),
('ingredient', 'ING_CUMIN', 'name', 'vi', 'Thì là Ai Cập', true, 'seed'),
('ingredient', 'ING_CUMIN', 'name', 'ko', '커민', true, 'seed'),
('ingredient', 'ING_CUMIN', 'name', 'ja', 'クミン', true, 'seed'),
-- Coriander
('ingredient', 'ING_CORIANDER', 'name', 'it', 'Coriandolo', true, 'seed'),
('ingredient', 'ING_CORIANDER', 'name', 'vi', 'Hạt mùi', true, 'seed'),
('ingredient', 'ING_CORIANDER', 'name', 'ko', '고수씨', true, 'seed'),
('ingredient', 'ING_CORIANDER', 'name', 'ja', 'コリアンダー', true, 'seed'),
-- Cinnamon
('ingredient', 'ING_CINNAMON', 'name', 'it', 'Cannella', true, 'seed'),
('ingredient', 'ING_CINNAMON', 'name', 'vi', 'Quế', true, 'seed'),
('ingredient', 'ING_CINNAMON', 'name', 'ko', '시나몬', true, 'seed'),
('ingredient', 'ING_CINNAMON', 'name', 'ja', 'シナモン', true, 'seed'),
-- Nutmeg
('ingredient', 'ING_NUTMEG', 'name', 'it', 'Noce moscata', true, 'seed'),
('ingredient', 'ING_NUTMEG', 'name', 'vi', 'Nhục đậu khấu', true, 'seed'),
('ingredient', 'ING_NUTMEG', 'name', 'ko', '육두구', true, 'seed'),
('ingredient', 'ING_NUTMEG', 'name', 'ja', 'ナツメグ', true, 'seed'),
-- Turmeric
('ingredient', 'ING_TURMERIC', 'name', 'it', 'Curcuma', true, 'seed'),
('ingredient', 'ING_TURMERIC', 'name', 'vi', 'Nghệ', true, 'seed'),
('ingredient', 'ING_TURMERIC', 'name', 'ko', '강황', true, 'seed'),
('ingredient', 'ING_TURMERIC', 'name', 'ja', 'ターメリック', true, 'seed'),
-- Ginger
('ingredient', 'ING_GINGER', 'name', 'it', 'Zenzero', true, 'seed'),
('ingredient', 'ING_GINGER', 'name', 'vi', 'Gừng', true, 'seed'),
('ingredient', 'ING_GINGER', 'name', 'ko', '생강', true, 'seed'),
('ingredient', 'ING_GINGER', 'name', 'ja', '生姜', true, 'seed'),
-- Chili Powder
('ingredient', 'ING_CHILI_POWDER', 'name', 'it', 'Peperoncino in polvere', true, 'seed'),
('ingredient', 'ING_CHILI_POWDER', 'name', 'vi', 'Bột ớt', true, 'seed'),
('ingredient', 'ING_CHILI_POWDER', 'name', 'ko', '고춧가루', true, 'seed'),
('ingredient', 'ING_CHILI_POWDER', 'name', 'ja', 'チリパウダー', true, 'seed'),
-- Curry Powder
('ingredient', 'ING_CURRY_POWDER', 'name', 'it', 'Curry', true, 'seed'),
('ingredient', 'ING_CURRY_POWDER', 'name', 'vi', 'Bột cà ri', true, 'seed'),
('ingredient', 'ING_CURRY_POWDER', 'name', 'ko', '카레 가루', true, 'seed'),
('ingredient', 'ING_CURRY_POWDER', 'name', 'ja', 'カレー粉', true, 'seed'),
-- Saffron
('ingredient', 'ING_SAFFRON', 'name', 'it', 'Zafferano', true, 'seed'),
('ingredient', 'ING_SAFFRON', 'name', 'vi', 'Nghệ tây', true, 'seed'),
('ingredient', 'ING_SAFFRON', 'name', 'ko', '사프란', true, 'seed'),
('ingredient', 'ING_SAFFRON', 'name', 'ja', 'サフラン', true, 'seed'),
-- Vanilla
('ingredient', 'ING_VANILLA', 'name', 'it', 'Vaniglia', true, 'seed'),
('ingredient', 'ING_VANILLA', 'name', 'vi', 'Vani', true, 'seed'),
('ingredient', 'ING_VANILLA', 'name', 'ko', '바닐라', true, 'seed'),
('ingredient', 'ING_VANILLA', 'name', 'ja', 'バニラ', true, 'seed')
ON CONFLICT DO NOTHING;

-- =====================================================
-- GRAINS / CEREALI
-- =====================================================

INSERT INTO translations (entity_type, entity_id, field, locale, value, is_verified, translated_by) VALUES
-- Rice
('ingredient', 'ING_RICE', 'name', 'it', 'Riso', true, 'seed'),
('ingredient', 'ING_RICE', 'name', 'vi', 'Gạo', true, 'seed'),
('ingredient', 'ING_RICE', 'name', 'ko', '쌀', true, 'seed'),
('ingredient', 'ING_RICE', 'name', 'ja', '米', true, 'seed'),
-- Pasta
('ingredient', 'ING_PASTA', 'name', 'it', 'Pasta', true, 'seed'),
('ingredient', 'ING_PASTA', 'name', 'vi', 'Mì Ý', true, 'seed'),
('ingredient', 'ING_PASTA', 'name', 'ko', '파스타', true, 'seed'),
('ingredient', 'ING_PASTA', 'name', 'ja', 'パスタ', true, 'seed'),
-- Flour
('ingredient', 'ING_FLOUR', 'name', 'it', 'Farina', true, 'seed'),
('ingredient', 'ING_FLOUR', 'name', 'vi', 'Bột mì', true, 'seed'),
('ingredient', 'ING_FLOUR', 'name', 'ko', '밀가루', true, 'seed'),
('ingredient', 'ING_FLOUR', 'name', 'ja', '小麦粉', true, 'seed'),
-- Bread
('ingredient', 'ING_BREAD', 'name', 'it', 'Pane', true, 'seed'),
('ingredient', 'ING_BREAD', 'name', 'vi', 'Bánh mì', true, 'seed'),
('ingredient', 'ING_BREAD', 'name', 'ko', '빵', true, 'seed'),
('ingredient', 'ING_BREAD', 'name', 'ja', 'パン', true, 'seed'),
-- Oats
('ingredient', 'ING_OATS', 'name', 'it', 'Avena', true, 'seed'),
('ingredient', 'ING_OATS', 'name', 'vi', 'Yến mạch', true, 'seed'),
('ingredient', 'ING_OATS', 'name', 'ko', '귀리', true, 'seed'),
('ingredient', 'ING_OATS', 'name', 'ja', 'オーツ麦', true, 'seed'),
-- Quinoa
('ingredient', 'ING_QUINOA', 'name', 'it', 'Quinoa', true, 'seed'),
('ingredient', 'ING_QUINOA', 'name', 'vi', 'Hạt diêm mạch', true, 'seed'),
('ingredient', 'ING_QUINOA', 'name', 'ko', '퀴노아', true, 'seed'),
('ingredient', 'ING_QUINOA', 'name', 'ja', 'キヌア', true, 'seed'),
-- Couscous
('ingredient', 'ING_COUSCOUS', 'name', 'it', 'Cuscus', true, 'seed'),
('ingredient', 'ING_COUSCOUS', 'name', 'vi', 'Couscous', true, 'seed'),
('ingredient', 'ING_COUSCOUS', 'name', 'ko', '쿠스쿠스', true, 'seed'),
('ingredient', 'ING_COUSCOUS', 'name', 'ja', 'クスクス', true, 'seed'),
-- Polenta
('ingredient', 'ING_POLENTA', 'name', 'it', 'Polenta', true, 'seed'),
('ingredient', 'ING_POLENTA', 'name', 'vi', 'Polenta', true, 'seed'),
('ingredient', 'ING_POLENTA', 'name', 'ko', '폴렌타', true, 'seed'),
('ingredient', 'ING_POLENTA', 'name', 'ja', 'ポレンタ', true, 'seed')
ON CONFLICT DO NOTHING;

-- =====================================================
-- OILS & CONDIMENTS / OLI E CONDIMENTI
-- =====================================================

INSERT INTO translations (entity_type, entity_id, field, locale, value, is_verified, translated_by) VALUES
-- Olive Oil
('ingredient', 'ING_OLIVE_OIL', 'name', 'it', 'Olio d''oliva', true, 'seed'),
('ingredient', 'ING_OLIVE_OIL', 'name', 'vi', 'Dầu ô liu', true, 'seed'),
('ingredient', 'ING_OLIVE_OIL', 'name', 'ko', '올리브유', true, 'seed'),
('ingredient', 'ING_OLIVE_OIL', 'name', 'ja', 'オリーブオイル', true, 'seed'),
-- Vegetable Oil
('ingredient', 'ING_VEGETABLE_OIL', 'name', 'it', 'Olio vegetale', true, 'seed'),
('ingredient', 'ING_VEGETABLE_OIL', 'name', 'vi', 'Dầu thực vật', true, 'seed'),
('ingredient', 'ING_VEGETABLE_OIL', 'name', 'ko', '식용유', true, 'seed'),
('ingredient', 'ING_VEGETABLE_OIL', 'name', 'ja', '植物油', true, 'seed'),
-- Sesame Oil
('ingredient', 'ING_SESAME_OIL', 'name', 'it', 'Olio di sesamo', true, 'seed'),
('ingredient', 'ING_SESAME_OIL', 'name', 'vi', 'Dầu mè', true, 'seed'),
('ingredient', 'ING_SESAME_OIL', 'name', 'ko', '참기름', true, 'seed'),
('ingredient', 'ING_SESAME_OIL', 'name', 'ja', 'ごま油', true, 'seed'),
-- Soy Sauce
('ingredient', 'ING_SOY_SAUCE', 'name', 'it', 'Salsa di soia', true, 'seed'),
('ingredient', 'ING_SOY_SAUCE', 'name', 'vi', 'Nước tương', true, 'seed'),
('ingredient', 'ING_SOY_SAUCE', 'name', 'ko', '간장', true, 'seed'),
('ingredient', 'ING_SOY_SAUCE', 'name', 'ja', '醤油', true, 'seed'),
-- Vinegar
('ingredient', 'ING_VINEGAR', 'name', 'it', 'Aceto', true, 'seed'),
('ingredient', 'ING_VINEGAR', 'name', 'vi', 'Giấm', true, 'seed'),
('ingredient', 'ING_VINEGAR', 'name', 'ko', '식초', true, 'seed'),
('ingredient', 'ING_VINEGAR', 'name', 'ja', '酢', true, 'seed'),
-- Balsamic Vinegar
('ingredient', 'ING_BALSAMIC_VINEGAR', 'name', 'it', 'Aceto balsamico', true, 'seed'),
('ingredient', 'ING_BALSAMIC_VINEGAR', 'name', 'vi', 'Giấm balsamic', true, 'seed'),
('ingredient', 'ING_BALSAMIC_VINEGAR', 'name', 'ko', '발사믹 식초', true, 'seed'),
('ingredient', 'ING_BALSAMIC_VINEGAR', 'name', 'ja', 'バルサミコ酢', true, 'seed'),
-- Honey
('ingredient', 'ING_HONEY', 'name', 'it', 'Miele', true, 'seed'),
('ingredient', 'ING_HONEY', 'name', 'vi', 'Mật ong', true, 'seed'),
('ingredient', 'ING_HONEY', 'name', 'ko', '꿀', true, 'seed'),
('ingredient', 'ING_HONEY', 'name', 'ja', 'ハチミツ', true, 'seed'),
-- Sugar
('ingredient', 'ING_SUGAR', 'name', 'it', 'Zucchero', true, 'seed'),
('ingredient', 'ING_SUGAR', 'name', 'vi', 'Đường', true, 'seed'),
('ingredient', 'ING_SUGAR', 'name', 'ko', '설탕', true, 'seed'),
('ingredient', 'ING_SUGAR', 'name', 'ja', '砂糖', true, 'seed'),
-- Mustard
('ingredient', 'ING_MUSTARD', 'name', 'it', 'Senape', true, 'seed'),
('ingredient', 'ING_MUSTARD', 'name', 'vi', 'Mù tạc', true, 'seed'),
('ingredient', 'ING_MUSTARD', 'name', 'ko', '겨자', true, 'seed'),
('ingredient', 'ING_MUSTARD', 'name', 'ja', 'マスタード', true, 'seed'),
-- Mayonnaise
('ingredient', 'ING_MAYONNAISE', 'name', 'it', 'Maionese', true, 'seed'),
('ingredient', 'ING_MAYONNAISE', 'name', 'vi', 'Sốt mayonnaise', true, 'seed'),
('ingredient', 'ING_MAYONNAISE', 'name', 'ko', '마요네즈', true, 'seed'),
('ingredient', 'ING_MAYONNAISE', 'name', 'ja', 'マヨネーズ', true, 'seed'),
-- Ketchup
('ingredient', 'ING_KETCHUP', 'name', 'it', 'Ketchup', true, 'seed'),
('ingredient', 'ING_KETCHUP', 'name', 'vi', 'Tương cà', true, 'seed'),
('ingredient', 'ING_KETCHUP', 'name', 'ko', '케첩', true, 'seed'),
('ingredient', 'ING_KETCHUP', 'name', 'ja', 'ケチャップ', true, 'seed')
ON CONFLICT DO NOTHING;

-- =====================================================
-- CHEESE / FORMAGGI
-- =====================================================

INSERT INTO translations (entity_type, entity_id, field, locale, value, is_verified, translated_by) VALUES
-- Mozzarella
('ingredient', 'ING_MOZZARELLA', 'name', 'it', 'Mozzarella', true, 'seed'),
('ingredient', 'ING_MOZZARELLA', 'name', 'vi', 'Phô mai Mozzarella', true, 'seed'),
('ingredient', 'ING_MOZZARELLA', 'name', 'ko', '모짜렐라', true, 'seed'),
('ingredient', 'ING_MOZZARELLA', 'name', 'ja', 'モッツァレラ', true, 'seed'),
-- Parmesan
('ingredient', 'ING_PARMESAN', 'name', 'it', 'Parmigiano', true, 'seed'),
('ingredient', 'ING_PARMESAN', 'name', 'vi', 'Phô mai Parmesan', true, 'seed'),
('ingredient', 'ING_PARMESAN', 'name', 'ko', '파르메산', true, 'seed'),
('ingredient', 'ING_PARMESAN', 'name', 'ja', 'パルメザン', true, 'seed'),
-- Cheddar
('ingredient', 'ING_CHEDDAR', 'name', 'it', 'Cheddar', true, 'seed'),
('ingredient', 'ING_CHEDDAR', 'name', 'vi', 'Phô mai Cheddar', true, 'seed'),
('ingredient', 'ING_CHEDDAR', 'name', 'ko', '체다', true, 'seed'),
('ingredient', 'ING_CHEDDAR', 'name', 'ja', 'チェダー', true, 'seed'),
-- Gorgonzola
('ingredient', 'ING_GORGONZOLA', 'name', 'it', 'Gorgonzola', true, 'seed'),
('ingredient', 'ING_GORGONZOLA', 'name', 'vi', 'Phô mai Gorgonzola', true, 'seed'),
('ingredient', 'ING_GORGONZOLA', 'name', 'ko', '고르곤졸라', true, 'seed'),
('ingredient', 'ING_GORGONZOLA', 'name', 'ja', 'ゴルゴンゾーラ', true, 'seed'),
-- Ricotta
('ingredient', 'ING_RICOTTA', 'name', 'it', 'Ricotta', true, 'seed'),
('ingredient', 'ING_RICOTTA', 'name', 'vi', 'Phô mai Ricotta', true, 'seed'),
('ingredient', 'ING_RICOTTA', 'name', 'ko', '리코타', true, 'seed'),
('ingredient', 'ING_RICOTTA', 'name', 'ja', 'リコッタ', true, 'seed'),
-- Feta
('ingredient', 'ING_FETA', 'name', 'it', 'Feta', true, 'seed'),
('ingredient', 'ING_FETA', 'name', 'vi', 'Phô mai Feta', true, 'seed'),
('ingredient', 'ING_FETA', 'name', 'ko', '페타', true, 'seed'),
('ingredient', 'ING_FETA', 'name', 'ja', 'フェタ', true, 'seed'),
-- Goat Cheese
('ingredient', 'ING_GOAT_CHEESE', 'name', 'it', 'Formaggio di capra', true, 'seed'),
('ingredient', 'ING_GOAT_CHEESE', 'name', 'vi', 'Phô mai dê', true, 'seed'),
('ingredient', 'ING_GOAT_CHEESE', 'name', 'ko', '염소 치즈', true, 'seed'),
('ingredient', 'ING_GOAT_CHEESE', 'name', 'ja', 'ゴートチーズ', true, 'seed'),
-- Mascarpone
('ingredient', 'ING_MASCARPONE', 'name', 'it', 'Mascarpone', true, 'seed'),
('ingredient', 'ING_MASCARPONE', 'name', 'vi', 'Kem phô mai Mascarpone', true, 'seed'),
('ingredient', 'ING_MASCARPONE', 'name', 'ko', '마스카포네', true, 'seed'),
('ingredient', 'ING_MASCARPONE', 'name', 'ja', 'マスカルポーネ', true, 'seed'),
-- Pecorino
('ingredient', 'ING_PECORINO', 'name', 'it', 'Pecorino', true, 'seed'),
('ingredient', 'ING_PECORINO', 'name', 'vi', 'Phô mai Pecorino', true, 'seed'),
('ingredient', 'ING_PECORINO', 'name', 'ko', '페코리노', true, 'seed'),
('ingredient', 'ING_PECORINO', 'name', 'ja', 'ペコリーノ', true, 'seed'),
-- Brie
('ingredient', 'ING_BRIE', 'name', 'it', 'Brie', true, 'seed'),
('ingredient', 'ING_BRIE', 'name', 'vi', 'Phô mai Brie', true, 'seed'),
('ingredient', 'ING_BRIE', 'name', 'ko', '브리', true, 'seed'),
('ingredient', 'ING_BRIE', 'name', 'ja', 'ブリー', true, 'seed')
ON CONFLICT DO NOTHING;

-- Batch 1 Summary:
-- ~120 ingredients × 4 languages = ~480 translation rows
-- Categories covered: Dairy, Vegetables, Fruits, Herbs, Meats, Seafood, Spices, Grains, Oils, Cheese
