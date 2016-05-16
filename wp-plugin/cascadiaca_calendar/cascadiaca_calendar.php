<?php
/**
 * Plugin Name: Cascadia Climate Action Calendar
 * Plugin URI: http://mypluginuri.com/
 * Description: A brief description about your plugin.
 * Version: 1.0
 * License: A "Slug" license name e.g. GPL12
 */

class WordPress_Plugin_Boilerplate {
    private static $instance = null;
    private $plugin_path;
    private $plugin_url;
    private $text_domain = '';
    private $jal_db_version = '1.0';

    private $table_name;

    /**
     * Creates or returns an instance of this class.
     */
    public static function get_instance() {
        // If an instance hasn't been created and set to $instance create an instance and set it to $instance.
        if ( null == self::$instance ) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    /**
     * Initializes the plugin by setting localization, hooks, filters, and administrative functions.
     */
    private function __construct() {
        $this->plugin_path = plugin_dir_path( __FILE__ );
        $this->plugin_url  = plugin_dir_url( __FILE__ );

        load_plugin_textdomain( $this->text_domain, false, $this->plugin_path . '\lang' );

        add_action( 'admin_enqueue_scripts', array( $this, 'register_scripts' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'register_styles' ) );

        add_action( 'wp_enqueue_scripts', array( $this, 'register_scripts' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'register_styles' ) );

        register_activation_hook( __FILE__, array( $this, 'activation' ) );
        register_deactivation_hook( __FILE__, array( $this, 'deactivation' ) );

        $this->run_plugin();
    }

    public function get_plugin_url() {
        return $this->plugin_url;
    }

    public function get_plugin_path() {
        return $this->plugin_path;
    }

    /**
     * Place code that runs at plugin activation here.
     */
    public function activation() {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'address';
        $this->jal_install();
        $this->jal_install_data();
    }

    /**
     * Place code that runs at plugin deactivation here.
     */
    public function deactivation() {

    }

    /**
     * Enqueue and register JavaScript files here.
     */
    public function register_scripts() {

    }

    /**
     * Enqueue and register CSS files here.
     */
    public function register_styles() {

    }

    function jal_install() {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();

//        $sql = "CREATE TABLE $this->table_name (
//		id mediumint(9) NOT NULL AUTO_INCREMENT,
//		time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
//		name tinytext NOT NULL,
//		text text NOT NULL,
//		url varchar(55) DEFAULT '' NOT NULL,
//		UNIQUE KEY id (id)
//	) $charset_collate;";

        $sql = "CREATE TABLE $this->table_name (
            address_id INT PRIMARY KEY AUTO_INCREMENT,
            building_name VARCHAR(100),
            street_address VARCHAR(100) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            zip VARCHAR(12) NOT NULL
        );";

        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
        dbDelta( $sql );

        add_option( 'jal_db_version', $this->jal_db_version );
    }

    function jal_install_data() {
        global $wpdb;

        $welcome_name = 'Mr. WordPress';
        $welcome_text = 'Congratulations, you just completed the installation!';

//       (`address_id`, `building_name`, `street_address`, `city`, `state`, `zip`) VALUES
//       $test_date = (1, NULL, , , , ),
//(2, NULL, '464 White Fox Hill Ct, APT 93', 'Karnes City', 'Colorado', '43916'),
//(3, 'Comcast Building', '84 East Prospect Hill Highway', 'Zuni', 'Mississippi', '02396'),
//(4, NULL, '98 Pine Tree Blvd', 'Engelhard', 'Rhode Island', '62677'),
//(5, 'Superior Building', '78 East Hope Drive', 'Clarksburg', 'North Carolina', '90137'),
//(6, NULL, '3710 New Fox Hill Drive, Suite 6176', 'Snoqualmie Pass', 'Michigan', '17388'),
//(7, 'Macy''s Bldg', '2471 SW Fox Hill Lane', 'Berkeley Springs', 'Louisiana', '57609'),
//(8, NULL, '22 Hope Circle', 'Harrisonville', 'West Virginia', '88055'),
//(9, 'Buhl Building', '3166 Mountain Blvd', 'Massapequa Park', 'Colorado', '29634'),
//(10, '257 Towers Bldg', '3791 Bayview Highway', 'Karns City', 'North Carolina', '66423'),

        $wpdb->insert(
            $this->table_name,
            array(
                'address_id' => 1,
                'building_name' => null,
                'street_address' => '574 Riddle Hill Avenue',
                'city'=>'Berkeley Heights',
                'state' => 'Illinois',
                'zip' => '21476'
            )
        );
    }

    function jal_uninstall(){

    }

    /**
     * Place code for your plugin's functionality here.
     */
    private function run_plugin() {
        global $wpdb;
        $myrows = $wpdb->get_results( 'SELECT *, name FROM $this->table_name' );

        if ( ! empty( $myrows ) ) {
            foreach ( $myrows as $address ) {
                echo '<p>' . $address->street_address . '</p>';
            }
        } else {
            echo 'No users found.';
        }
    }
}

WordPress_Plugin_Boilerplate::get_instance();
