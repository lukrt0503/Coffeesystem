import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db'
import { User } from './user';

interface BannerAttributes {
    banner_id: number;
    user_id: number;
    image_url: string;
}

interface BannerCreationAttributes extends Optional<BannerAttributes, 'banner_id'> { }

class Banner extends Model<BannerAttributes, BannerCreationAttributes> implements BannerAttributes {
    public banner_id!: number;
    public user_id!: number;
    public image_url!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public readonly user?: User;
    public static associations: {
        user: Association<Banner, User>;
    };
    static async listBanner(): Promise<any[]> {
        const banners = await Banner.findAll();
        const convertedBanners = banners.map((banner) => {
            return {
                bannerId: banner.banner_id,
                userId: banner.user_id,
                imageUrl: banner.image_url,
            }
        });
        return convertedBanners;
    }

    static async addBanner(bannerData: BannerCreationAttributes): Promise<Banner> {
        try {
            const banner = await Banner.create(bannerData);
            return banner;
        } catch (error) {
            throw new Error('Unable to add banner');
        }
    }

    static async detailBanner(banner_id: number): Promise<any | null> {
        try {
            const banner = await Banner.findByPk(banner_id);
            const convertedBanners = {
                bannerId: banner?.banner_id,
                userId: banner?.user_id,
                imageUrl: banner?.image_url,
            }
            return convertedBanners;
        } catch (error) {
            throw new Error('Not found');
        }
    }
    static async updateBanner(bannerId: number, updatedData: Partial<BannerCreationAttributes>): Promise<any> {
        try {
            const banner = await Banner.findByPk(bannerId);
            if (banner) {
                await banner.update(updatedData);
            }
        } catch (error) {
            console.log(error)
            throw new Error('Unable to update banner');
        }
    }
    static async deleteBanner(bannerId: number) {
        try {
            await Banner.destroy({
                where: { banner_id: bannerId },
            });
            return 0;
        } catch (error) {
            throw new Error('Unable to delete banner');
        }
    }
}

Banner.init(
    {
        banner_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image_url: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        }
    },
    {
        tableName: 'banner',
        sequelize: sequelize,
    }
);
Banner.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export { Banner };
