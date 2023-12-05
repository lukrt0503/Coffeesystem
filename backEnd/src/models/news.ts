import { Association, DataTypes, Model, Optional } from 'sequelize';
import { Constant } from '../constant';
import { sequelize } from '../db'
import { GroupImage } from './groupImage';
import { User } from './user';

interface NewsAttributes {
    news_id: number;
    user_id: number;
    title: string;
    description: string;
    groupImage_id: number;
    created_date: Date
}

interface NewsCreationAttributes extends Optional<NewsAttributes, 'news_id'> { }

class News extends Model<NewsAttributes, NewsCreationAttributes> implements NewsAttributes {
    public news_id!: number;
    public user_id!: number;
    public title!: string;
    public description!: string;
    public groupImage_id!: number;
    public created_date!: Date;
    public createdAt!: Date;
    public updatedAt!: Date;
    public readonly user?: User;
    public readonly groupImage?: GroupImage;
    public static associations: {
        user: Association<News, User>;
        groupImage: Association<News, GroupImage>;
    };
    static async listNews(): Promise<any[]> {
        const news = await News.findAll();
        const convertedNews = news.map(async (item) => {
            const coffeeShopName = await Constant.getUserShopName(item.user_id);
            const imageUrl = await Constant.getImageUrl(item.groupImage_id);
            return {
                userId: item.user_id,
                newsId: item.news_id,
                coffeeShopName,
                title: item.title,
                description: item.description,
                imageUrl,
                createdDate: item.created_date,
            };
        });
        return Promise.all(convertedNews);
    }
    static async getUserNews(userId: number): Promise<any[]> {
        const news = await News.findAll({
            where: {
                user_id: userId
            }
        });
        const convertedNews = news.map(async (item) => {
            const coffeeShopName = await Constant.getUserShopName(item.user_id);
            const imageUrl = await Constant.getImageUrl(item.groupImage_id);
            return {
                userId: item.user_id,
                newsId: item.news_id,
                coffeeShopName,
                title: item.title,
                description: item.description,
                imageUrl,
                createdDate: item.created_date,
            };
        });
        return Promise.all(convertedNews);
    }
    static async detailNews(news_id: number): Promise<any | null> {
        try {
            const news = await News.findByPk(news_id);
            const coffeeShopName = await Constant.getUserShopName(news?.user_id as number);
            const imageUrl = await Constant.getImageUrl(news?.groupImage_id as number);
            const convertedNews = {
                newsId: news?.news_id,
                coffeeShopName,
                title: news?.title,
                description: news?.description,
                imageUrl,
                createdDate: news?.created_date,
            };
            return convertedNews;
        } catch (error) {
            throw new Error('Not found');
        }
    }
    static async addNews(newsData: any): Promise<News> {
        try {
            const news = await News.create(newsData);
            return news;
        } catch (error) {
            console.error('Error in addNews method:', error); // Log lỗi cụ thể ở đây
            throw new Error('Unable to add news');
        }
    }
    static async updateNews(updatedData: Partial<NewsAttributes>): Promise<[number, News[]]> {
        try {
            const [updatedRowsCount, updatedNews] = await News.update(updatedData, {
                where: { news_id: updatedData.news_id },
                returning: true,
            });

            if (updatedRowsCount === 0 || !updatedNews || updatedNews.length === 0) {
                throw new Error('News not found or unable to update');
            }

            return [updatedRowsCount, updatedNews];
        } catch (error) {
            throw new Error('Unable to update news');
        }
    }
    static async deleteNews(newsId: number) {
        try {
            await News.destroy({
                where: { news_id: newsId },
            });
            return 0;
        } catch (error) {
            throw new Error('Unable to delete news');
        }
    }
}

News.init(
    {
        news_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: new DataTypes.STRING(1045),
            allowNull: false,
        },
        groupImage_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        tableName: 'news',
        sequelize: sequelize,
    }
);
export { News };
